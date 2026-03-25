"use client";
import { useState } from "react";
import {
  LayoutDashboard, BedDouble, Calendar, Star, BarChart3,
  LogOut, Plus, Pencil, Trash2, CheckCircle, XCircle, Eye,
  TrendingUp, Users, DollarSign, Hotel, Menu, X,
} from "lucide-react";

// Mock data
const mockBookings = [
  { id: "BK001", name: "Priya Sharma", room: "Deluxe Garden Room", checkin: "2025-04-10", checkout: "2025-04-13", guests: 2, total: 10500, status: "confirmed", phone: "+91 98765 11111" },
  { id: "BK002", name: "Rahul Verma", room: "Family Suite", checkin: "2025-04-15", checkout: "2025-04-18", guests: 4, total: 16500, status: "pending", phone: "+91 98765 22222" },
  { id: "BK003", name: "Arjun Nair", room: "Cozy Standard", checkin: "2025-04-20", checkout: "2025-04-22", guests: 1, total: 4400, status: "confirmed", phone: "+91 98765 33333" },
  { id: "BK004", name: "Sneha Kulkarni", room: "Deluxe Garden Room", checkin: "2025-05-01", checkout: "2025-05-05", guests: 2, total: 14000, status: "pending", phone: "+91 98765 44444" },
  { id: "BK005", name: "Deepak Gowda", room: "Family Suite", checkin: "2025-05-10", checkout: "2025-05-12", guests: 3, total: 11000, status: "cancelled", phone: "+91 98765 55555" },
];

const mockReviews = [
  { id: 1, name: "Priya Sharma", rating: 5, review: "Absolutely magical! The coffee plantation view is breathtaking.", date: "March 2025", status: "approved" },
  { id: 2, name: "Rahul Verma", rating: 5, review: "Perfect family vacation. Kids loved the plantation walk!", date: "February 2025", status: "pending" },
  { id: 3, name: "Arjun Nair", rating: 5, review: "Best homestay in Coorg. Highly recommended!", date: "January 2025", status: "approved" },
  { id: 4, name: "Anonymous", rating: 2, review: "WiFi was slow, not great experience.", date: "March 2025", status: "pending" },
];

const mockRooms = [
  { id: "deluxe", name: "Deluxe Garden Room", price: 3500, capacity: 2, status: "available", bookings: 42 },
  { id: "family", name: "Family Suite", price: 5500, capacity: 4, status: "occupied", bookings: 28 },
  { id: "budget", name: "Cozy Standard Room", price: 2200, capacity: 2, status: "available", bookings: 35 },
];

type TabType = "dashboard" | "bookings" | "rooms" | "reviews" | "analytics";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookings, setBookings] = useState(mockBookings);
  const [reviews, setReviews] = useState(mockReviews);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "ananya2025") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Try admin / ananya2025");
    }
  };

  const updateBookingStatus = (id: string, status: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const updateReviewStatus = (id: number, status: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReview = (id: number) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, var(--primary-dark) 0%, #0f2a0d 50%, var(--accent) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "28px",
            padding: "48px 40px",
            width: "100%",
            maxWidth: "420px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: "28px",
              }}
            >
              🏡
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--primary-dark)",
                marginBottom: "6px",
              }}
            >
              Admin Portal
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Ananya Home Stay · Coorg</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>Username</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter username"
                value={loginForm.username}
                onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter password"
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            {loginError && (
              <div style={{ background: "#fee2e2", color: "#991b1b", padding: "12px", borderRadius: "10px", fontSize: "13px" }}>
                ⚠️ {loginError}
              </div>
            )}
            <button type="submit" className="btn-primary" style={{ justifyContent: "center", marginTop: "8px" }}>
              Sign In to Dashboard
            </button>
          </form>
          <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "var(--text-muted)" }}>
            Demo: admin / ananya2025
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { id: "bookings", icon: <Calendar size={18} />, label: "Bookings" },
    { id: "rooms", icon: <BedDouble size={18} />, label: "Rooms" },
    { id: "reviews", icon: <Star size={18} />, label: "Reviews" },
    { id: "analytics", icon: <BarChart3 size={18} />, label: "Analytics" },
  ];

  const stats = [
    { label: "Total Bookings", value: "87", icon: <Calendar size={20} />, change: "+12%", color: "#dbeafe", iconColor: "#1e40af" },
    { label: "Revenue (Mar)", value: "₹2.1L", icon: <DollarSign size={20} />, change: "+8%", color: "#dcfce7", iconColor: "#166534" },
    { label: "Active Guests", value: "6", icon: <Users size={20} />, change: "Today", color: "#f3e8ff", iconColor: "#6d28d9" },
    { label: "Occupancy Rate", value: "78%", icon: <Hotel size={20} />, change: "+5%", color: "#fef3c7", iconColor: "#92400e" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <div
        className="admin-sidebar"
        style={{
          width: sidebarOpen ? "260px" : "72px",
          transition: "width 0.3s ease",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "18px" }}>
            🏡
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "16px", color: "white" }}>Ananya</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "1px" }}>ADMIN</div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`admin-nav-item ${activeTab === item.id ? "active" : ""}`}
              style={{ width: "100%", border: "none", textAlign: "left", justifyContent: sidebarOpen ? "flex-start" : "center" }}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="admin-nav-item"
            style={{ width: "100%", border: "none", justifyContent: sidebarOpen ? "flex-start" : "center" }}
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Log Out</span>}
          </button>
          <a
            href="/"
            className="admin-nav-item"
            style={{ display: "flex", marginTop: "4px", justifyContent: sidebarOpen ? "flex-start" : "center" }}
          >
            <Eye size={18} />
            {sidebarOpen && <span>View Website</span>}
          </a>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Topbar */}
        <div
          style={{
            background: "white",
            padding: "16px 32px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "var(--primary-dark)" }}>
            {navItems.find(n => n.id === activeTab)?.label}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </div>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--primary)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              A
            </div>
          </div>
        </div>

        <div style={{ padding: "32px" }}>
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
                {stats.map((stat, i) => (
                  <div key={i} className="admin-stat-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: stat.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: stat.iconColor,
                        }}
                      >
                        {stat.icon}
                      </div>
                      <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: 600, background: "#dcfce7", padding: "4px 8px", borderRadius: "50px" }}>
                        {stat.change}
                      </span>
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "var(--primary-dark)" }}>
                      {stat.value}
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent bookings */}
              <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontWeight: 700, color: "var(--primary-dark)", fontSize: "17px" }}>Recent Bookings</h3>
                  <button onClick={() => setActiveTab("bookings")} style={{ color: "var(--primary)", fontSize: "14px", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
                    View All →
                  </button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Guest</th>
                        <th>Room</th>
                        <th>Check-in</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 4).map(b => (
                        <tr key={b.id}>
                          <td style={{ fontWeight: 600, color: "var(--primary)" }}>{b.id}</td>
                          <td>{b.name}</td>
                          <td>{b.room}</td>
                          <td>{b.checkin}</td>
                          <td style={{ fontWeight: 600 }}>₹{b.total.toLocaleString()}</td>
                          <td><span className={`status-${b.status}`}>{b.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Room status */}
              <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontWeight: 700, color: "var(--primary-dark)", fontSize: "17px", marginBottom: "20px" }}>Room Status</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                  {mockRooms.map(room => (
                    <div
                      key={room.id}
                      style={{
                        padding: "20px",
                        borderRadius: "14px",
                        border: "1px solid var(--border)",
                        background: room.status === "occupied" ? "#fef3c7" : "#dcfce7",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontWeight: 600, fontSize: "15px" }}>{room.name}</span>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "50px",
                            fontSize: "12px",
                            fontWeight: 600,
                            background: room.status === "occupied" ? "#fef08a" : "#bbf7d0",
                            color: room.status === "occupied" ? "#854d0e" : "#166534",
                          }}
                        >
                          {room.status}
                        </span>
                      </div>
                      <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>₹{room.price.toLocaleString()}/night</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px" }}>{room.bookings} total bookings</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bookings */}
          {activeTab === "bookings" && (
            <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontWeight: 700, color: "var(--primary-dark)", fontSize: "17px", marginBottom: "20px" }}>
                All Bookings ({bookings.length})
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Guest Name</th>
                      <th>Room</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Guests</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 600, color: "var(--primary)" }}>{b.id}</td>
                        <td>
                          <div>{b.name}</div>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{b.phone}</div>
                        </td>
                        <td>{b.room}</td>
                        <td>{b.checkin}</td>
                        <td>{b.checkout}</td>
                        <td style={{ textAlign: "center" }}>{b.guests}</td>
                        <td style={{ fontWeight: 600 }}>₹{b.total.toLocaleString()}</td>
                        <td><span className={`status-${b.status}`}>{b.status}</span></td>
                        <td>
                          <div style={{ display: "flex", gap: "8px" }}>
                            {b.status === "pending" && (
                              <>
                                <button
                                  onClick={() => updateBookingStatus(b.id, "confirmed")}
                                  style={{ background: "none", border: "none", cursor: "pointer", color: "#16a34a", display: "flex" }}
                                  title="Confirm"
                                >
                                  <CheckCircle size={18} />
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(b.id, "cancelled")}
                                  style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", display: "flex" }}
                                  title="Cancel"
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            )}
                            <a
                              href={`https://wa.me/${b.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(b.name)}%2C%20your%20booking%20at%20Ananya%20Home%20Stay%20is%20confirmed!`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#25d366", display: "flex" }}
                              title="WhatsApp"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Rooms */}
          {activeTab === "rooms" && (
            <div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <button className="btn-primary" style={{ gap: "8px" }}>
                  <Plus size={18} /> Add New Room
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {mockRooms.map(room => (
                  <div
                    key={room.id}
                    style={{
                      background: "white",
                      borderRadius: "16px",
                      padding: "24px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "14px",
                        background: "var(--bg-green-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        flexShrink: 0,
                      }}
                    >
                      🛏️
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "var(--primary-dark)", fontSize: "17px" }}>{room.name}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                        Capacity: {room.capacity} guests · {room.bookings} total bookings
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "var(--primary)" }}>
                        ₹{room.price.toLocaleString()}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>per night</div>
                    </div>
                    <span
                      style={{
                        padding: "6px 14px",
                        borderRadius: "50px",
                        fontSize: "13px",
                        fontWeight: 600,
                        background: room.status === "occupied" ? "#fef08a" : "#bbf7d0",
                        color: room.status === "occupied" ? "#854d0e" : "#166534",
                      }}
                    >
                      {room.status}
                    </span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button style={{ background: "var(--bg-green-light)", border: "none", borderRadius: "10px", padding: "10px", cursor: "pointer", color: "var(--primary)", display: "flex" }}>
                        <Pencil size={16} />
                      </button>
                      <button style={{ background: "#fee2e2", border: "none", borderRadius: "10px", padding: "10px", cursor: "pointer", color: "#dc2626", display: "flex" }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {reviews.map(review => (
                <div
                  key={review.id}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    border: review.status === "pending" ? "2px solid #fef08a" : "2px solid #bbf7d0",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--primary-dark)" }}>{review.name}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "13px" }}>{review.date}</div>
                      <div style={{ display: "flex", gap: "3px", marginTop: "6px" }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "#d4a853" : "transparent"} color={i < review.rating ? "#d4a853" : "#d1d5db"} />
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: "50px",
                          fontSize: "12px",
                          fontWeight: 600,
                          background: review.status === "pending" ? "#fef9c3" : "#dcfce7",
                          color: review.status === "pending" ? "#854d0e" : "#166534",
                        }}
                      >
                        {review.status}
                      </span>
                      {review.status === "pending" && (
                        <button
                          onClick={() => updateReviewStatus(review.id, "approved")}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#16a34a", display: "flex" }}
                        >
                          <CheckCircle size={20} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", display: "flex" }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.7, fontStyle: "italic" }}>
                    "{review.review}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Analytics */}
          {activeTab === "analytics" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {/* Revenue chart placeholder */}
              <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", gridColumn: "span 2" }}>
                <h3 style={{ fontWeight: 700, color: "var(--primary-dark)", marginBottom: "20px" }}>Revenue Overview (Last 6 Months)</h3>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", height: "180px" }}>
                  {[
                    { month: "Oct", revenue: 85000 },
                    { month: "Nov", revenue: 110000 },
                    { month: "Dec", revenue: 165000 },
                    { month: "Jan", revenue: 95000 },
                    { month: "Feb", revenue: 130000 },
                    { month: "Mar", revenue: 210000 },
                  ].map((d, i) => {
                    const maxRev = 210000;
                    const height = Math.round((d.revenue / maxRev) * 160);
                    return (
                      <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600 }}>₹{(d.revenue / 1000).toFixed(0)}k</div>
                        <div
                          style={{
                            width: "100%",
                            height: `${height}px`,
                            background: i === 5
                              ? "linear-gradient(to top, var(--primary), var(--primary-light))"
                              : "var(--bg-green-light)",
                            borderRadius: "8px 8px 0 0",
                            transition: "height 0.5s ease",
                          }}
                        />
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>{d.month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Booking sources */}
              <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontWeight: 700, color: "var(--primary-dark)", marginBottom: "20px" }}>Booking Sources</h3>
                {[
                  { source: "Direct (Website)", pct: 45, color: "var(--primary)" },
                  { source: "WhatsApp", pct: 30, color: "#25d366" },
                  { source: "Google", pct: 15, color: "#4285f4" },
                  { source: "Referrals", pct: 10, color: "var(--gold)" },
                ].map(s => (
                  <div key={s.source} style={{ marginBottom: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "14px", color: "var(--text-dark)" }}>{s.source}</span>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--primary-dark)" }}>{s.pct}%</span>
                    </div>
                    <div style={{ height: "8px", background: "#f3f4f6", borderRadius: "4px" }}>
                      <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: "4px", transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Guest types */}
              <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontWeight: 700, color: "var(--primary-dark)", marginBottom: "20px" }}>Guest Types</h3>
                {[
                  { type: "Couple", count: 42, pct: 48 },
                  { type: "Family", count: 25, pct: 29 },
                  { type: "Solo", count: 12, pct: 14 },
                  { type: "Group", count: 8, pct: 9 },
                ].map(g => (
                  <div key={g.type} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", padding: "12px 16px", background: "#f8fafc", borderRadius: "10px" }}>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--primary-dark)" }}>{g.type}</div>
                      <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{g.count} bookings</div>
                    </div>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "var(--bg-green-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        color: "var(--primary)",
                      }}
                    >
                      {g.pct}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
