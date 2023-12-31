const jwt = require("jsonwebtoken");
require('dotenv').config("../../.env");
const createError = require("./error");

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        return next(createError(401, `You are not authorized to access`));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>
    {
        if(err) return next(createError(403, `Token is not valid`));

        req.user = user;
        next();
    })
}

exports.verifyUser = (req, res, next) => {
    exports.verifyToken(req, res, next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin)
        {
            next();
        }else
        {
            return next(createError(403,"You are not authorised!!"));
        }
    })
}

exports.verifyAdmin = (req, res, next) => {
    exports.verifyToken(req, res, next, ()=>{
        if(req.user.isAdmin)
        {
            next();
        }else
        {
            return next(createError(403,"You are not authorised!!"));
        }
    })
}