const express = require("express");
const app = express();
const roomController = require("../controllers/room");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.route("/").get(verifyAdmin, roomController.getAllRooms);

router.route("/:hotelid").post(verifyAdmin, roomController.createRoom);

router.put("/availability/:id", roomController.updateRoomAvailability);

router.route("/:id/:hotelid").delete(verifyAdmin, roomController.deleteRoom);

router
  .route("/:id")
  .get(roomController.getRoom)
  .put(verifyAdmin, roomController.updateRoom);

module.exports = router;
