const db = require('../models')
const User = db.users //memanggil collection users

exports.createUser = async(req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
    })

    try {
        const saveUser = await user.save();
        res.send(saveUser)
    } catch (e) {
        console.log(e)
    }
}