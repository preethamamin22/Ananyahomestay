import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Testing insert in workspace...");
  try {
    const booking = await prisma.booking.create({
      data: {
        name: "Test User",
        phone: "+91 99999 99999",
        email: "test@example.com",
        room: "Deluxe Garden Room",
        checkin: "2026-06-01",
        checkout: "2026-06-03",
        guests: 2,
        total: 2400,
        status: "pending",
      }
    });
    console.log("Insert successful in workspace!", booking);
    
    // Clean up
    await prisma.booking.delete({ where: { id: booking.id } });
    console.log("Cleanup successful!");
  } catch (error) {
    console.error("Insert failed in workspace with error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
