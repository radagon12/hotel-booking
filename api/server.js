require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const roomRoutes = require("./routes/room");
const hotelRoutes = require("./routes/hotel");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser")
const { default: mongoose } = require("mongoose");
const userRoutes = require("./routes/user");

app.use(express.json());
app.use(cookieParser());

app.listen(8800, () => {
  console.log("listening on port 8800");
});

// console.log(process.env.MONGO)

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error(err));

app.use((req, res, next) => {
  const time = new Date().getTime();
  req.requestTime = new Date(time).toISOString();

  next();
});

app.use((req, res, next) => {
  const startTime = new Date();

  // Store the startTime in the request object to access it later
  req.startTime = startTime;

  res.on('finish', () => {
    const endTime = new Date();
    const requestTime = endTime - startTime;

    // Define colors for request methods
    const colors = {
      GET: '\x1b[32m',    // Green
      POST: '\x1b[34m',   // Blue
      PUT: '\x1b[33m',    // Yellow
      DELETE: '\x1b[31m'  // Red
    };

    // Get the color for the request method
    const color = colors[req.method] || '\x1b[0m'; // Default color: Reset

    // Log the request details to the console with colors
    console.log(`${color}${req.method}\x1b[0m ${res.statusCode} ${req.originalUrl} ${requestTime}ms`);
  });

  next();
});

app.use("/api/rooms", roomRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;  
    const errorMessage = err.message || "Something went wrong !!";

    console.error( {success: 'failed',
    status: errorStatus,
    error: errorMessage,
    stack: err.stack,})

    return res.status(errorStatus).json({
        success: 'failed',
        status: errorStatus,
        error: errorMessage,
        stack: err.stack,
    })
})
