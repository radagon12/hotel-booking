const hotelSchema = require("../models/hotel");
const mongoose = require("mongoose");
const createError = require("../utils/error");
const roomSchema = require("../models/room");

const Hotel = mongoose.model("Hotel", hotelSchema);
const Room = mongoose.model("Room", roomSchema);

exports.createNewHotel = async (req, res, next) => {
  try {
    const savedHotel = await Hotel.create(req.body);

    res.status(201).json(savedHotel);
  } catch (e) {
    next(err);
  }
};

exports.updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedHotel);
  } catch (e) {
    res.status(500).json({ status: "error", message: e });
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.deleteOne({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      message: "hotel deleted successfully",
    });
  } catch (e) {
    return next(createError(403, "hotel could not be deleted!!"));
  }
};

exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findOne({ _id: req.params.id });

    res.status(200).json(hotel);
  } catch (e) {
    res.status(500).json({ status: "error", message: e });
  }
};

exports.getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || -1, $lte: max || 100000 },
      limit: undefined,
    }).limit(others.limit); // changes have been done ___________

    // console.log(hotels)

    res.status(200).json(hotels);
  } catch (e) {
    res.status(500).json({ status: "error", message: e });
  }
};

exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (e) {
    res.status(500).json({ status: "error", message: e });
  }
};

exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
        { type: "Hotel", count: hotelCount },
        { type: "Apartment", count: apartmentCount },
        { type: "Resort", count: resortCount },
        { type: "Villa", count: villaCount },
        { type: "Cabin", count: cabinCount },
      ]);
  } catch (e) {
    res.status(500).json({ status: "error", message: e });
  }
};

exports.getHotelRooms = async (req, res , next) =>
{
  try {
    const hotel = await Hotel.findOne({ _id: req.params.id });

    const list = hotel.rooms && await Promise.all(hotel.rooms.map(room =>{
      return Room.findById(room);
    }))

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}