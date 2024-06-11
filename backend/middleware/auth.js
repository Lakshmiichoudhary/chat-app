const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const Authenticate = (req,res,next) => {
    const token = req.headers["authentication"]

    if(token === null) return res.sendStatus(401);

    jwt.verify(token,process.env.JWT_SECRET,async (err,jwtData) => {
        if(err) return res.sendStatus(403);
        const user = await User.findByPk(jwtData.id);
        req.user = user;
        next()
    })
}

module.exports = Authenticate;