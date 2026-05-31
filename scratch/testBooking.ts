import prisma from '../lib/db';

async function main() {
  const roomRecord = await prisma.room.findFirst({
    where: { name: 'Deluxe Garden Room' },
    select: { id: true }
  });

  const booking = await prisma.booking.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      roomId: roomRecord?.id || 'deluxe',
      checkin: new Date('2024-01-01'),
      checkout: new Date('2024-01-05'),
      guests: 2,
      total: 2400,
      status: 'pending',
    },
  });
  console.log('Created booking:', booking);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
