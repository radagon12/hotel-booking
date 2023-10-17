const hotelController = require("../controllers/hotel");
const express = require("express");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router
  .route("/")
  .post(verifyAdmin, hotelController.createNewHotel)
  .get(hotelController.getAllHotels);

router.get("/countByCity", hotelController.countByCity)
router.get("/countByType", hotelController.countByType)
router.get("/room/:id", hotelController.getHotelRooms)

router 
  .route("/:id")
  .get(hotelController.getHotel)
  .put(verifyAdmin, hotelController.updateHotel)
  .delete(verifyAdmin, hotelController.deleteHotel);

module.exports = router;
