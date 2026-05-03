const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   SERVE FRONTEND
   (IMPORTANT: folder name must match)
========================= */
app.use(express.static(path.join(__dirname, "frontend")));

/* =========================
   TEST ROUTE
========================= */
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running properly" });
});

/* =========================
   IN-MEMORY ORDERS (TEMP)
========================= */
let orders = [];

/* =========================
   PLACE ORDER
========================= */
app.post("/api/order", (req, res) => {
  try {
    const { cart, total } = req.body;

    // basic validation
    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = {
      id: Date.now(),
      cart,
      total,
      createdAt: new Date()
    };

    orders.push(order);

    console.log("✅ New Order:", order);

    res.json({
      message: "Order placed successfully",
      orderId: order.id
    });

  } catch (error) {
    console.error("❌ Order Error:", error);
    res.status(500).json({ message: "Server error while placing order" });
  }
});

/* =========================
   GET ALL ORDERS
========================= */
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

/* =========================
   DEFAULT ROUTE → index.html
========================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});