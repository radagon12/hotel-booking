const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field is required"],
  },
  type: {
    type: String,
    required: [true, "type field is required"],
  },
  city: {
    type: String,
    required: [true, "city field is required"],
  },
  address: {
    type: String,
    required: [true, "address field is required"],
  },
  distance: {
    type: String,
    required: [true, "distance field is required"],
  },
  photos: {
    type: [String],
  },
  title:{
    type: String
  },
  desc: {
    type: String,
    required: [true, "desc field is required"],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: [true, "cheapest price field is required"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = HotelSchema;
