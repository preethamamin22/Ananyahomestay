import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.room.createMany({
    data: [
      { id: "deluxe", name: "Deluxe Garden Room", price: 3500, capacity: 2, status: "available", bookings: 42 },
      { id: "family", name: "Family Suite", price: 5500, capacity: 4, status: "occupied", bookings: 28 },
      { id: "budget", name: "Cozy Standard Room", price: 2200, capacity: 2, status: "available", bookings: 35 },
    ],
  })

  await prisma.booking.createMany({
    data: [
      { id: "BK001", name: "Priya Sharma", room: "Deluxe Garden Room", checkin: "2025-04-10", checkout: "2025-04-13", guests: 2, total: 10500, status: "confirmed", phone: "+91 98765 11111" },
      { id: "BK002", name: "Rahul Verma", room: "Family Suite", checkin: "2025-04-15", checkout: "2025-04-18", guests: 4, total: 16500, status: "pending", phone: "+91 98765 22222" },
      { id: "BK003", name: "Arjun Nair", room: "Cozy Standard", checkin: "2025-04-20", checkout: "2025-04-22", guests: 1, total: 4400, status: "confirmed", phone: "+91 98765 33333" },
      { id: "BK004", name: "Sneha Kulkarni", room: "Deluxe Garden Room", checkin: "2025-05-01", checkout: "2025-05-05", guests: 2, total: 14000, status: "pending", phone: "+91 98765 44444" },
      { id: "BK005", name: "Deepak Gowda", room: "Family Suite", checkin: "2025-05-10", checkout: "2025-05-12", guests: 3, total: 11000, status: "cancelled", phone: "+91 98765 55555" },
    ],
  })

  await prisma.review.createMany({
    data: [
      { id: 1, name: "Priya Sharma", rating: 5, review: "Absolutely magical! The coffee plantation view is breathtaking.", date: "March 2025", status: "approved" },
      { id: 2, name: "Rahul Verma", rating: 5, review: "Perfect family vacation. Kids loved the plantation walk!", date: "February 2025", status: "pending" },
      { id: 3, name: "Arjun Nair", rating: 5, review: "Best homestay in Coorg. Highly recommended!", date: "January 2025", status: "approved" },
      { id: 4, name: "Anonymous", rating: 2, review: "WiFi was slow, not great experience.", date: "March 2025", status: "pending" },
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
