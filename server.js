const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

/* 🔴 REQUIRED MIDDLEWARES */
app.use(cors());                 // 👈 ALLOW FRONTEND
app.use(express.json());         // 👈 PARSE JSON BODY

/* ROUTES */
app.use("/api/transactions", transactionRoutes);

/* DB CONNECT */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);