const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = 3000;
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const dotenv = require("dotenv");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
dotenv.config();

connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
