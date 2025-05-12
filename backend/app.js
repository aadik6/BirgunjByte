require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
ConnectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/category", categoryRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
