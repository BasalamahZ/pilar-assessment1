const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      fullname: req.body.fullname,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    return res.status(200).send({
      success: true,
      message: "success",
      data: {
        id: user._id,
      },
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err,
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Something Wrong",
      });
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(400).send({
        success: false,
        message: "Something Wrong",
      });
    }
    return res.status(200).send({
      success: true,
      message: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
