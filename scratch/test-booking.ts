import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function test() {
  // Check rooms exist
  const rooms = await prisma.room.findMany()
  console.log('Rooms in DB:', JSON.stringify(rooms, null, 2))

  // Try creating a booking
  try {
    const roomRecord = await prisma.room.findFirst({ where: { name: 'Deluxe Garden Room' } })
    console.log('Found room:', roomRecord)
    
    const booking = await prisma.booking.create({
      data: {
        name: 'Test User',
        phone: '+91 98765 00000',
        email: 'test@example.com',
        roomId: roomRecord!.id,
        checkin: new Date('2025-07-01'),
        checkout: new Date('2025-07-03'),
        guests: 2,
        total: 2400,
        status: 'pending',
      }
    })
    console.log('Booking created successfully:', booking.id)
  } catch (err: any) {
    console.error('Booking FAILED:', err.message)
  } finally {
    await prisma.$disconnect()
  }
}

test()
