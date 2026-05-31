import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { id, name, phone, email, room, checkin, checkout, guests, total } = data

    if (!name || !checkin || !checkout || !room) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate a booking reference ID if not provided by client
    const bookingId = id || `BK-${Date.now().toString().slice(-4)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    console.log(`✅ Booking received | ID: ${bookingId} | Guest: ${name} | Room: ${room} | ${checkin} → ${checkout} | Guests: ${guests} | Total: ₹${total}`)

    const { default: prisma } = await import('@/lib/db')
    
    // Find or seed the room record with correct standard price and capacity
    let roomRecord = await prisma.room.findFirst({ where: { name: room }, select: { id: true } })
    if (!roomRecord) {
      const roomId = room.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      
      let price = 1200
      let capacity = 4
      
      if (room.toLowerCase().includes('cozy')) {
        price = 800
        capacity = 2
      } else if (room.toLowerCase().includes('deluxe')) {
        price = 1200
        capacity = 2
      }

      roomRecord = await prisma.room.create({
        data: { 
          id: roomId, 
          name: room, 
          price: price, 
          capacity: capacity, 
          status: 'available', 
          bookingsCount: 0 
        },
      })
    }

    // Save booking directly to Neon PostgreSQL database via Prisma
    const saved = await prisma.booking.create({
      data: {
        id: bookingId,
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
    console.log(`💾 Booking successfully saved to Neon PostgreSQL with ID: ${saved.id}`)

    return NextResponse.json({ success: true, id: bookingId })

  } catch (err: any) {
    console.error('❌ Booking API error:', err?.message || err)
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}
