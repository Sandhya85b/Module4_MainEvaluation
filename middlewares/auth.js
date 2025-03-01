const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.headers?.authorization?.splits(" ")[1];
  try {
    if (!token) {
      res.status(403).json({ msg: "Invalid Token" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ msg: "Access denied, Invalid token" });
  }
};
const checkRole=(roles)=>(req,res,next)=>{
  if(!roles.includes(req.user.role)){
    return res.status(403).json({msg:"Role not found"})
  }
  next()
}

module.exports = {authMiddleware,checkRole};
