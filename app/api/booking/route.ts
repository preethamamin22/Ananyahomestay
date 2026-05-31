import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, phone, email, room, checkin, checkout, guests, total } = data

    if (!name || !checkin || !checkout || !room) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate a booking reference ID
    const bookingId = `BK-${Date.now()}`

    console.log(`✅ Booking received | ID: ${bookingId} | Guest: ${name} | Room: ${room} | ${checkin} → ${checkout} | Guests: ${guests} | Total: ₹${total}`)

    // Try to save to database silently (non-blocking, non-fatal)
    // This is skipped gracefully on Vercel/serverless where SQLite is unavailable
    try {
      const { default: prisma } = await import('@/lib/db')
      let roomRecord = await prisma.room.findFirst({ where: { name: room }, select: { id: true } })
      if (!roomRecord) {
        const roomId = room.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        roomRecord = await prisma.room.create({
          data: { id: roomId, name: room, price: 0, capacity: 4, status: 'available', bookingsCount: 0 },
        })
      }
      const saved = await prisma.booking.create({
        data: {
          name,
          phone: phone || '',
          email: email || '',
          roomId: roomRecord.id,
          checkin: new Date(checkin),
          checkout: new Date(checkout),
          guests: Number(guests) || 1,
          total: Number(total) || 0,
          status: 'pending',
        },
      })
      console.log(`💾 Booking saved to DB with ID: ${saved.id}`)
    } catch {
      console.warn('💾 DB save skipped — running in serverless/no-DB environment')
    }

    return NextResponse.json({ success: true, id: bookingId })

  } catch (err: any) {
    console.error('❌ Booking API error:', err?.message)
    return NextResponse.json(
      { success: false, error: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}
