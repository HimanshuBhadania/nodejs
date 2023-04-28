const express = require("express");
const {getUsers,getUser,addUser,deleteUser,updateUser} = require("../controller/userController")

const router = express.Router();

router.route("/").get(getUsers).post(addUser);
router.route("/:id",).get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;