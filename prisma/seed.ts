import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany()
  await prisma.room.deleteMany()
  await prisma.testimonial.deleteMany()

  await prisma.room.createMany({
    data: [
      { id: "deluxe", name: "Deluxe Garden Room", price: 3500, capacity: 2, status: "available", bookingsCount: 42 },
      { id: "family", name: "Family Suite", price: 5500, capacity: 4, status: "occupied", bookingsCount: 28 },
      { id: "budget", name: "Cozy Standard Room", price: 2200, capacity: 2, status: "available", bookingsCount: 35 },
    ],
  })

  await prisma.booking.createMany({
    data: [
      { id: "BK001", name: "Priya Sharma", roomId: "deluxe", checkin: new Date("2025-04-10"), checkout: new Date("2025-04-13"), guests: 2, total: 10500, status: "confirmed", phone: "+91 98765 11111", email: "priyaa@example.com" },
      { id: "BK002", name: "Rahul Verma", roomId: "family", checkin: new Date("2025-04-15"), checkout: new Date("2025-04-18"), guests: 4, total: 16500, status: "pending", phone: "+91 98765 22222", email: "rahulv@example.com" },
      { id: "BK003", name: "Arjun Nair", roomId: "budget", checkin: new Date("2025-04-20"), checkout: new Date("2025-04-22"), guests: 1, total: 4400, status: "confirmed", phone: "+91 98765 33333", email: "arjunn@example.com" },
      { id: "BK004", name: "Sneha Kulkarni", roomId: "deluxe", checkin: new Date("2025-05-01"), checkout: new Date("2025-05-05"), guests: 2, total: 14000, status: "pending", phone: "+91 98765 44444", email: "sneha@example.com" },
      { id: "BK005", name: "Deepak Gowda", roomId: "family", checkin: new Date("2025-05-10"), checkout: new Date("2025-05-12"), guests: 3, total: 11000, status: "cancelled", phone: "+91 98765 55555", email: "deepak@example.com" },
    ],
  })

  await prisma.testimonial.createMany({
    data: [
      { name: "Priya Sharma", rating: 5, review: "Absolutely magical! The coffee plantation view is breathtaking.", approved: true },
      { name: "Rahul Verma", rating: 5, review: "Perfect family vacation. Kids loved the plantation walk!", approved: false },
      { name: "Arjun Nair", rating: 5, review: "Best homestay in Coorg. Highly recommended!", approved: true },
      { name: "Anonymous", rating: 2, review: "WiFi was slow, not great experience.", approved: false },
    ],
  })

  console.log('Seeded database!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
