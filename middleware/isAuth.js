import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    const header = req.headers["authorization"];
    const token  = header && header.split(" ")[1];

    if(! token) return res.status(401).json({"message": "Unauthenticated"});

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if(err) return res.status(401).json({"message": "Unauthenticated"});

        req.user = response;

        next();
    })
}

export default isAuth;