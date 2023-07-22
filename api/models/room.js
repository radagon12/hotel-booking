const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title field is required"]
  },
  price: {
    type: Number,
    required: [true, "price field is required"]
  },
  maxPeople: {
    type: Number,
    required: [true, "maxPeople field is required"]
  },
  desc: {
    type: String,
    required: [true, "type field is required"],
  },
  roomNumbers: [{number: Number, unavailableDates: {type : [Date]}}]
},{timestamps:true});

module.exports = RoomSchema;
