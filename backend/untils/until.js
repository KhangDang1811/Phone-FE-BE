import jwt from 'jsonwebtoken';
// import multer from "multer";
// import path from "path";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "dangkhang1811",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "dangkhang1811",
      (err, decode) => {
        if (err) {
          res.status.send({ message: "invalid token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "no token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "invalid admin token" });
  }
};

