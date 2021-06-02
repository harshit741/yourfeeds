const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { signupSchema, signinScehma } = require("../Validation");

//Signup
router.post("/signup", async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const emailExist = await User.exists({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json({ message: "Email already exist!" });
  }
  //Securing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.json({ message: `User ${savedUser.name} created!` });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/signin", async (req, res) => {
  const { error } = signinScehma.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Email doesn't exist!" });
  }
  const vaildatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!vaildatePassword) {
    return res.status(400).json({ message: "Invalid password!" });
  }
  //Assigning token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.header("auth-token", token);
  res.json({ message: `User ${user.name} is signed in!`, token: token });
});
module.exports = router;