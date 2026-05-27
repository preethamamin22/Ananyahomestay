import prisma from '../lib/db';

async function main() {
  const booking = await prisma.booking.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      room: 'Deluxe Garden Room',
      checkin: '2024-01-01',
      checkout: '2024-01-05',
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
