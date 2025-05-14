require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;
ConnectDB();
const corsOptions = {
  origin: ["http://localhost:5173",
    process.env.FRONTEND_PROD_URL
  ], // Replace with your frontend URL
  credentials: true, // Allow cookies and Authorization headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/category", categoryRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
