const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const userData = require("./userdata");

const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, password, password1 } = req.body;

  const userExists = await userData.findOne({ email });
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const hashPassword1 = await bcrypt.hash(password1, salt);

  //   user created
  const user = await userData.create({
    fname,
    lname,
    email,
    password: hashPassword,
    password1: hashPassword1,
  })

  if (user) {
    res.status(201).json({
        _id: user._id,
        first_name: user.fname,
        last_name: user.lname,
        email: user.email,
        password:user.password,
        password1:user.password1,
        token: generateToken(user._id),
      })
  } else {
    res.status(400)
    throw new Error('Invalid credential')
  }
});

// checking login credential for user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userData.findOne({email})
  console.log(user)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
        _id: user._id,
        email: user.email,
        name:user.fname,
        token: generateToken(user._id),
      })
  } else {
    res.status(400)
    throw new Error('Invalid credential')
  }
})
const generateToken = (id) => {
    return jwt.sign({ id }, 'secret@123', {
      expiresIn: '30d',
    })
  }

module.exports={
    registerUser,
    loginUser
}
