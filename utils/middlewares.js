const User = require("../models/user.model")
const Admin = require("../models/admin.model")
const jwt = require("jsonwebtoken")

const authMiddleware = async (req,res,next) => {
  try {
    const token = req.headers["authorization"] ? req.headers["authorization"].replace("Bearer ", "") : null    
    const userType = req.headers["usertype"] ? req.headers["usertype"] : "admin"
    const personId = jwt.verify(token, process.env.SECRET_KEY)
    const person =  userType === "admin" ? await Admin.findOne({_id: personId}) : await User.findOne({_id: personId})
    if(!person) return res.status(404).json("The user cannot be found. Please verify if the account still exist")
    req.person = person
    req.token = token
    next()
  } catch (err){
    res.status(401).json("The user is not authorized to do this action")
  }
}

module.exports = {
  authMiddleware
}