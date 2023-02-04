const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    let {authorization: token} = req.headers;

    token && ( token = token.replace("Bearer ", "") );
    token ?
    jwt.verify(token, process.env.JWT_SECRET, {algorithms: "HS512"}, (error, decode) => {
        if(error) {
            res.status(400).json({
                error: "Invalid token",
                message: "Get a new token"
            });
        }else {
            req.user = decode;
            next();
        };
    }):
    res.status(400).json({message: "not found authorization"});
};

module.exports = authMiddleware;