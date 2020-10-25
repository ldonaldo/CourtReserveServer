const EventEmiter = require("events")
const User = require("../models/user.model")
const userSubscription = require("../subscribers/user.subscribers");
const bcrypt = require("bcrypt");

class UserService extends EventEmiter {
  createNewUser = async (req ,res) => {    
    try{
      const userData = (({name, email, password, cellphone, profilePhoto}) => ({name, email, password, cellphone, profilePhoto}))(req.body)
      const user = await new User(userData)
      const token = await user.generateAuthToken()
      await user.encryptPassword()
      user.tokens.push(token)
      await user.save()
      res.status(201).json({token, user})
    }catch(err){
      res.status(400).json(err.message)
    }
  }
  loginUser = async (req,res) => {    
    try{
      const {email, password} = req.body
      const user = await User.findOne({email}) || {}
      const isValid = await bcrypt.compare(password, user.password || "" )
      if(Object.keys(user).length === 0 || !isValid) throw Error("the email or password is incorrect")
      const token = await user.generateAuthToken()
      const updatedResult = await User.updateOne({_id: user._id},{tokens: [token]})
      //this.emit("lenderLoged")
      res.status(200).json({token})
    } catch(err){
      console.log(err)
      res.status(401).json(err.message)
    }
  }
  logoutUser = async (req,res) => {    
    try{
      const {token} = req.body
      const user = await User.findOne({tokens: {$in: [token]}}) || {}
      const updatedResult = await User.updateOne({_id: user._id},{tokens: []})
      res.status(200).json({updatedResult})
    } catch(err){
      console.log(err)
      res.status(400).json(err.message)
    }
  }
  getUser = async (req,res) => {
    try {
      const user = req.person
      res.status(200).json(user)
    } catch(err){
      res.status(400).json(err.message)
    }
  }
  updateUser = async (req,res) => {
    try {
      const { name, cellphone } = req.body;
      const updated = await User.updateOne({_id: req.person._id},{name, cellphone})
      res.status(200).json(updated)
    } catch(err){
      res.status(400).json(err.message)
    }
  }
  deleteUser = async (req,res) => {
    try {
      const { _id } = req.person ;
      const deleted =  await User.deleteOne({_id})
      this.emit("userDeleted", _id) 
      res.status(200).json(deleted)
    } catch(err){
      res.status(400).json(err.message)
    } 
  }
}

const userService = new UserService()
userService.on('userDeleted',userSubscription.deleteReservationsFromUser)
module.exports = userService