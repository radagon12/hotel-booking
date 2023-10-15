const userController = require("../controllers/user");
const express = require("express");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.route("/").get(verifyAdmin, userController.getAllUsers);

router
  .route("/:id")
  .get(verifyUser, userController.getUser)
  .put(verifyUser, userController.updateUser)
  .delete(verifyUser, userController.deleteUser);

module.exports = router;
