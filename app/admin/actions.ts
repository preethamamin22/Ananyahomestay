'use server'

import { revalidatePath } from 'next/cache'

// Safe wrapper to import prisma, ensuring it doesn't crash on serverless imports if environment is missing
async function getPrisma() {
  try {
    const { default: prisma } = await import('@/lib/db')
    return prisma
  } catch (err) {
    console.error('Prisma initialization failed:', err)
    return null
  }
}

// Zero-config cloud bookings bucket helpers (Refactored to Neon PostgreSQL)
async function getCloudBookings(): Promise<any[]> {
  try {
    const prisma = await getPrisma()
    if (prisma) {
      const dbBookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        include: { room: true },
      })
      return dbBookings.map(b => ({
        id: b.id,
        name: b.name,
        phone: b.phone || '',
        email: b.email || '',
        room: b.room ? b.room.name : 'Deluxe Garden Room',
        checkin: b.checkin.toISOString().split('T')[0],
        checkout: b.checkout.toISOString().split('T')[0],
        guests: b.guests,
        total: b.total,
        status: b.status,
        createdAt: b.createdAt.toISOString(),
      }))
    }
  } catch (e) {
    console.error("Error loading db bookings:", e);
  }
  return [];
}

async function saveCloudBookings(bookings: any[]): Promise<boolean> {
  // Deprecated helper since we save directly to Neon PostgreSQL. Returns true for backward compatibility.
  return true;
}

export async function getDashboardStats() {
  try {
    const bookingsList = await getCloudBookings();
    const totalBookings = bookingsList.length;
    
    const revenue = bookingsList
      .filter(b => b.status === 'confirmed' || b.status === 'pending')
      .reduce((sum, b) => sum + (Number(b.total) || 0), 0);
      
    const activeGuests = bookingsList
      .filter(b => b.status === 'confirmed' || b.status === 'pending')
      .reduce((sum, b) => sum + (Number(b.guests) || 0), 0);

    const totalRooms = 3;
    const occupiedRooms = activeGuests > 0 ? 1 : 0;
    const occupancyRate = Math.min(100, Math.round((occupiedRooms / totalRooms) * 100));

    return {
      totalBookings,
      revenue,
      activeGuests,
      occupancyRate,
    };
  } catch (err) {
    console.error('Error fetching dashboard stats:', err)
    return { totalBookings: 0, revenue: 0, activeGuests: 0, occupancyRate: 0 }
  }
}

export async function getDashboardData() {
  try {
    const prisma = await getPrisma()
    const bookingsList = await getCloudBookings();

    let rooms: { id: string; name: string; price: number; capacity: number; status: string; bookingsCount: number }[] = [];
    let reviews: { id: number; name: string; rating: number; review: string; date: string; status: string }[] = [];

    if (prisma) {
      try {
        rooms = await prisma.room.findMany();
        
        // Auto-seed rooms in DB if empty to guarantee database initial state
        if (rooms.length === 0) {
          const defaultRooms = [
            { id: "deluxe-garden-room", name: "Deluxe Garden Room", price: 1200, capacity: 2, status: "available" },
            { id: "family-suite", name: "Family Suite", price: 1200, capacity: 4, status: "available" },
            { id: "cozy-standard-room", name: "Cozy Standard Room", price: 800, capacity: 2, status: "available" },
          ];
          for (const r of defaultRooms) {
            await prisma.room.upsert({
              where: { id: r.id },
              update: {},
              create: r
            });
          }
          rooms = await prisma.room.findMany();
        }

        const rawReviews = await prisma.testimonial.findMany({ orderBy: { id: 'desc' } });
        reviews = rawReviews.map(r => ({
          id: r.id,
          name: r.name,
          rating: r.rating,
          review: r.review,
          date: r.date.toISOString().split('T')[0],
          status: r.approved ? 'approved' : 'pending',
        }));
      } catch (dbErr) {
        console.warn("DB room/review loading bypassed:", dbErr);
      }
    }

    if (rooms.length === 0) {
      rooms = [
        { id: "deluxe-garden-room", name: "Deluxe Garden Room", price: 1200, capacity: 2, status: "available", bookingsCount: bookingsList.filter(b => b.room === "Deluxe Garden Room").length },
        { id: "family-suite", name: "Family Suite", price: 1200, capacity: 4, status: "available", bookingsCount: bookingsList.filter(b => b.room === "Family Suite").length },
        { id: "cozy-standard-room", name: "Cozy Standard Room", price: 800, capacity: 2, status: "available", bookingsCount: bookingsList.filter(b => b.room === "Cozy Standard Room").length },
      ];
    }

    const serializedRooms = rooms.map(r => ({
      id: r.id,
      name: r.name,
      price: r.price,
      capacity: r.capacity,
      status: r.status,
      bookings: bookingsList.filter(b => b.room === r.name).length,
    }));

    return { rooms: serializedRooms, bookings: bookingsList, reviews };
  } catch (err) {
    console.error('Error fetching dashboard data:', err)
    return { rooms: [], bookings: [], reviews: [] }
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    const prisma = await getPrisma()
    if (prisma) {
      await prisma.booking.update({
        where: { id },
        data: { status }
      });
      revalidatePath('/admin')
    }
  } catch (err) {
    console.error('Error updating booking status:', err)
  }
}

export async function updateRoomPrice(id: string, price: number, capacity: number) {
  try {
    const prisma = await getPrisma();
    if (prisma) {
      await prisma.room.update({
        where: { id },
        data: { price, capacity },
      });
      revalidatePath('/admin');
      return { success: true };
    }
    return { success: false, error: 'Database client not available' };
  } catch (err: any) {
    console.error('Error updating room price:', err);
    return { success: false, error: err?.message || 'Failed to update room price' };
  }
}


export async function updateReviewStatus(id: number, status: string) {
  try {
    const prisma = await getPrisma()
    if (!prisma) return
    await prisma.testimonial.update({ where: { id }, data: { approved: status === 'approved' } })
    revalidatePath('/admin')
  } catch (err) {
    console.error('Error updating review status:', err)
  }
}

export async function deleteReviewAction(id: number) {
  try {
    const prisma = await getPrisma()
    if (!prisma) return
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath('/admin')
  } catch (err) {
    console.error('Error deleting review:', err)
  }
}

export async function getBookedDates() {
  try {
    const bookings = await getCloudBookings();
    return bookings
      .filter(b => b.status === 'confirmed' || b.status === 'pending')
      .map(b => ({
        checkin: b.checkin,
        checkout: b.checkout,
      }))
  } catch (err) {
    console.error('Error getting booked dates:', err)
    return []
  }
}

export async function createBookingAction(data: {
  name: string;
  phone: string;
  email: string;
  room: string;
  checkin: string;
  checkout: string;
  guests: number;
  total: number;
  status: string;
}) {
  try {
    const prisma = await getPrisma()
    if (!prisma) throw new Error("Prisma client not available")

    let roomRecord = await prisma.room.findFirst({ where: { name: data.room } })
    if (!roomRecord) {
      const roomId = data.room.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      
      let price = 1200
      let capacity = 4
      
      if (data.room.toLowerCase().includes('cozy')) {
        price = 800
        capacity = 2
      } else if (data.room.toLowerCase().includes('deluxe')) {
        price = 1200
        capacity = 2
      }

      roomRecord = await prisma.room.create({
        data: { id: roomId, name: data.room, price, capacity, status: 'available' }
      })
    }

    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
    const newBookingId = `BK-${Date.now().toString().slice(-4)}-${randomPart}`

    const newBooking = await prisma.booking.create({
      data: {
        id: newBookingId,
        name: data.name,
        phone: data.phone || '',
        email: data.email || '',
        roomId: roomRecord.id,
        checkin: new Date(data.checkin),
        checkout: new Date(data.checkout),
        guests: Number(data.guests) || 1,
        total: Number(data.total) || 0,
        status: data.status || 'pending',
      }
    })

    revalidatePath('/admin')
    return { success: true, id: newBooking.id };
  } catch (err: any) {
    console.error('Error creating booking via action:', err)
    return { success: false, error: err?.message || 'Failed to create booking' }
  }
}
