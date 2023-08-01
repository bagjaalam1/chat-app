const db = require("../models");
const User = db.users; //memanggil collection users

exports.createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
  });

  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch (e) {
    console.error(e);
  }
};

exports.usernameValidation = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.find({ username });
    if (user.length > 0) {
      console.log({ user });
      res.json(user);
      res.redirect('http://localhost:3000/oauth/login')
    } else {
      res.send('email tidak terdaftar')
    }
  } catch (e) {
    console.error(e);
    res.status(404).json({ error: "User not found" })
  }
};
