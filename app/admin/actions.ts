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

  const rooms = await prisma.room.findMany()
  const bookings = await prisma.booking.findMany({ orderBy: { id: 'desc' } })
  const reviews = await prisma.review.findMany({ orderBy: { id: 'desc' } })
  
  return { rooms, bookings, reviews }
}

export async function updateBookingStatus(id: string, status: string) {
  await prisma.booking.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/admin')
}

export async function updateReviewStatus(id: number, status: string) {
  await prisma.review.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/admin')
}

export async function deleteReviewAction(id: number) {
  await prisma.review.delete({
    where: { id }
  })
  revalidatePath('/admin')
}

export async function getBookedDates() {
  const bookings = await prisma.booking.findMany({
    where: { status: { in: ['confirmed', 'pending'] } },
    select: { checkin: true, checkout: true }
  })
  return bookings
}
