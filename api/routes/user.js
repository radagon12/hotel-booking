const userController = require("../controllers/user");
const express = require("express");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// router.route("/check/auth").get(verifyToken, (req, res, next) => {
//   res.send("Hello user, you are logged in");
//   next();
// });

// router.route("/checkuser/:id").get(verifyUser, (req, res, next) => {
//   res.send("Hello user, you are logged in and deletion privileges for your account are granted");
// });

// router.route("/checkadmin/:id").get(verifyAdmin, (req, res, next) => {
//     res.send("Hello admin, you are logged in and deletion privileges for all accounts are granted");
//   });

router.route("/").get(verifyAdmin, userController.getAllUsers);

router
  .route("/:id")
  .get(verifyUser, userController.getUser)
  .put(verifyUser, userController.updateUser)
  .delete(verifyUser, userController.deleteUser);

module.exports = router;
