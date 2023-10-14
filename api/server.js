require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const roomRoutes = require("./routes/room");
const hotelRoutes = require("./routes/hotel");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser")
const { default: mongoose } = require("mongoose");
const userRoutes = require("./routes/user");
const morgan = require("morgan");
const path = require('path');

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'build')));

app.listen(3000, () => {
  console.log("listening on port 3000");
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
