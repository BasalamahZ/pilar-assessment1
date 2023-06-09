const express = require("express");
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const app = express();
const port = process.env.PORT || 5000;
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connceting to Database
Mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Database Connected")
);

// Routes
app.get("/", (req, res) => {
  res.send("We are on home");
});
app.use("/api/auth", authRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

// Start Server
app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
