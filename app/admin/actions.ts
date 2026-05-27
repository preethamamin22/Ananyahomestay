'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getDashboardStats() {
  const totalBookings = await prisma.booking.count();
  const revenue = await prisma.booking.aggregate({
    _sum: { total: true },
    where: { status: { in: ['confirmed', 'pending'] } },
  });
  const activeGuests = await prisma.booking.aggregate({
    _sum: { guests: true },
    where: { status: { in: ['confirmed', 'pending'] } },
  });
  const totalRooms = await prisma.room.count();
  const occupiedRooms = await prisma.room.count({ where: { status: 'occupied' } });
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
  return {
    totalBookings,
    revenue: revenue._sum.total ?? 0,
    activeGuests: activeGuests._sum.guests ?? 0,
    occupancyRate,
  };
}

export async function getDashboardData() {
  const rooms = await prisma.room.findMany();
  const rawBookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: { room: { select: { name: true } } },
  });

  // Serialize dates to strings and flatten room name for the client
  const bookings = rawBookings.map(b => ({
    id: b.id,
    name: b.name,
    phone: b.phone ?? '',
    email: b.email ?? '',
    room: b.room?.name ?? '',
    checkin: b.checkin.toISOString().split('T')[0],
    checkout: b.checkout.toISOString().split('T')[0],
    guests: b.guests,
    total: b.total,
    status: b.status,
  }));

  // Use Testimonial model for reviews
  const rawReviews = await prisma.testimonial.findMany({ orderBy: { id: 'desc' } });
  const reviews = rawReviews.map(r => ({
    id: r.id,
    name: r.name,
    rating: r.rating,
    review: r.review,
    date: r.date.toISOString().split('T')[0],
    status: r.approved ? 'approved' : 'pending',
  }));

  // Serialize room data
  const serializedRooms = rooms.map(r => ({
    id: r.id,
    name: r.name,
    price: r.price,
    capacity: r.capacity,
    status: r.status,
    bookings: r.bookingsCount,
  }));

  return { rooms: serializedRooms, bookings, reviews };
}

export async function updateBookingStatus(id: string, status: string) {
  await prisma.booking.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/admin')
}

export async function updateReviewStatus(id: number, status: string) {
  await prisma.testimonial.update({
    where: { id },
    data: { approved: status === 'approved' }
  })
  revalidatePath('/admin')
}

export async function deleteReviewAction(id: number) {
  await prisma.testimonial.delete({
    where: { id }
  })
  revalidatePath('/admin')
}

export async function getBookedDates() {
  const bookings = await prisma.booking.findMany({
    where: { status: { in: ['confirmed', 'pending'] } },
    select: { checkin: true, checkout: true }
  })
  // Return as ISO strings so the client can parse them
  return bookings.map(b => ({
    checkin: b.checkin.toISOString(),
    checkout: b.checkout.toISOString(),
  }))
}

export async function createBookingAction(data: {
  name: string;
  phone: string;
  email: string;
  room: string; // room name
  checkin: string;
  checkout: string;
  guests: number;
  total: number;
  status: string;
}): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    // Resolve room name to its ID, or auto-create the room if it doesn't exist
    let roomRecord = await prisma.room.findFirst({
      where: { name: data.room },
      select: { id: true },
    });

    if (!roomRecord) {
      // Auto-create room so booking never fails due to missing room
      const roomId = data.room.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const created = await prisma.room.create({
        data: {
          id: roomId,
          name: data.room,
          price: 0,
          capacity: 4,
          status: 'available',
          bookingsCount: 0,
        },
      });
      roomRecord = { id: created.id };
    }

    // Convert date strings to Date objects for the DateTime fields
    const checkinDate = new Date(data.checkin);
    const checkoutDate = new Date(data.checkout);

    const newBooking = await prisma.booking.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        roomId: roomRecord.id,
        checkin: checkinDate,
        checkout: checkoutDate,
        guests: data.guests,
        total: data.total,
        status: data.status,
      },
    });
    revalidatePath('/admin');
    return { success: true, id: newBooking.id };
  } catch (err: any) {
    console.error('createBookingAction error:', err);
    return { success: false, error: err?.message || 'Unknown database error' };
  }
}
