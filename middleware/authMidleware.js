const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt

    //check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'nini secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
                
            }
        })
    }

    else {
        res.redirect('/login');
    }
}

// check current user
const checkUser = (req, res, next)=>{
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'nini secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.users = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await Users.findOne(decodedToken.email);
                res.locals.users = user;
                next();
                
            }
        })
    }
    else {
        res.locals.users = null;
        next();
    }
}
module.exports = { requireAuth,checkUser };