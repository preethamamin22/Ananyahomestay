import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, phone, email, room, checkin, checkout, guests, total, status } = data

    if (!name || !checkin || !checkout || !room) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    // Resolve room name to its ID, auto-create if missing
    let roomRecord = await prisma.room.findFirst({
      where: { name: room },
      select: { id: true },
    })

    if (!roomRecord) {
      const roomId = room.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const created = await prisma.room.create({
        data: {
          id: roomId,
          name: room,
          price: 0,
          capacity: 4,
          status: 'available',
          bookingsCount: 0,
        },
      })
      roomRecord = { id: created.id }
    }

    const newBooking = await prisma.booking.create({
      data: {
        name,
        phone: phone || '',
        email: email || '',
        roomId: roomRecord.id,
        checkin: new Date(checkin),
        checkout: new Date(checkout),
        guests: Number(guests),
        total: Number(total),
        status: status || 'pending',
      },
    })

    console.log('✅ Booking created:', newBooking.id, '| Room:', room, '| Guest:', name)
    return NextResponse.json({ success: true, id: newBooking.id })

  } catch (err: any) {
    console.error('❌ Booking API error:', err.message)
    return NextResponse.json({ success: false, error: err?.message || 'Database error' }, { status: 500 })
  }
}
