const roomSchema = require("../models/room");
const hotelSchema = require("../models/hotel");
const { default: mongoose } = require("mongoose");

const Room = mongoose.model("Room", roomSchema);
const Hotel = mongoose.model("Hotel", hotelSchema);

exports.createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelid;
    const savedRoom = await Room.create(req.body);

    try {
      await Hotel.updateOne(
        { _id: hotelId },
        { $push: { rooms: savedRoom.id } }
      );
    } catch (err) {
      next(err);
    }

    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedRoom);
  } catch (e) {
    next(e);
  }
};

exports.updateRoomAvailability = async (req, res, next) => {
  try {
    const data = await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );

    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelid;
    await Room.deleteOne({ _id: req.params.id });

    try {
        await Hotel.updateOne(
          { _id: hotelId },
          { $pull: { rooms: req.params.id } }
        );
      } catch (err) {
        next(err);
      }  

    res.status(200).json({
      status: "success",
      message: "room deleted successfully",
    });
  } catch (e) {
    return next(createError(403, "room could not be deleted!!"));
  }
};

exports.getRoom = async (req, res, next) => {
  try {
    const fetchedRoom = await Room.findOne({ _id: req.params.id });

    res.status(200).json({fetchedRoom});
  } catch (e) {
    next(e);
  }
};

exports.getAllRooms = async (req, res, next) => {
  try {
    const fetchedRooms = await Room.find();

    res.status(200).json(fetchedRooms);
  } catch (e) {
    next(e);
  }
};
