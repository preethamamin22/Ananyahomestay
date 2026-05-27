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

  const rawReviews = await prisma.testimonial.findMany({ orderBy: { id: 'desc' } });
  const reviews = rawReviews.map(r => ({
    id: r.id,
    name: r.name,
    rating: r.rating,
    review: r.review,
    date: r.date.toISOString().split('T')[0],
    status: r.approved ? 'approved' : 'pending',
  }));

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
  await prisma.booking.update({ where: { id }, data: { status } })
  revalidatePath('/admin')
}

export async function updateReviewStatus(id: number, status: string) {
  await prisma.testimonial.update({ where: { id }, data: { approved: status === 'approved' } })
  revalidatePath('/admin')
}

export async function deleteReviewAction(id: number) {
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath('/admin')
}

export async function getBookedDates() {
  const bookings = await prisma.booking.findMany({
    where: { status: { in: ['confirmed', 'pending'] } },
    select: { checkin: true, checkout: true }
  })
  return bookings.map(b => ({
    checkin: b.checkin.toISOString(),
    checkout: b.checkout.toISOString(),
  }))
}

// NOTE: createBookingAction is intentionally NOT using revalidatePath
// because it causes Next.js to throw an internal error that breaks client components.
// Booking creation is handled via /api/booking REST route instead.
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
  let roomRecord = await prisma.room.findFirst({
    where: { name: data.room },
    select: { id: true },
  });

  if (!roomRecord) {
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

  const newBooking = await prisma.booking.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      roomId: roomRecord.id,
      checkin: new Date(data.checkin),
      checkout: new Date(data.checkout),
      guests: data.guests,
      total: data.total,
      status: data.status,
    },
  });

  // DO NOT call revalidatePath here - it throws NEXT_REDIRECT internally
  // and gets caught by the client's catch block, causing false errors.

  return { success: true, id: newBooking.id };
}
