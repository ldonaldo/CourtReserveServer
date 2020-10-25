const EventEmiter = require("events")
const Admin = require("../models/admin.model")
const adminSubscription = require("../subscribers/admin.subscribers")
const bcrypt = require("bcrypt");

class AdminService extends EventEmiter {
  createNewAdmin = async (req ,res) => {    
    try{
      const adminData = (({name, email, password, cellphone, profilePhoto}) => ({name, email, password, cellphone, profilePhoto}))(req.body)
      const admin = await new Admin(adminData)
      const token = await admin.generateAuthToken()
      await admin.encryptPassword()
      admin.tokens.push(token)
      await admin.save()
      res.status(201).json({token, admin})
    }catch(err){
      res.status(400).json(err.message)
    }
  }
  loginAdmin = async (req,res) => {    
    try{
      const {email, password} = req.body
      const admin = await Admin.findOne({email}) || {}
      const isValid = await bcrypt.compare(password, admin.password || "" )
      if(Object.keys(admin).length === 0 || !isValid) throw Error("The email or password is incorrect")
      const token = await admin.generateAuthToken()
      const updatedResult = await Admin.updateOne({_id: admin._id},{tokens: [token]})
      res.status(200).json({token})
    } catch(err){
      console.log(err)
      res.status(401).json(err.message)
    }
  }
  logoutAdmin = async (req,res) => {    
    try{
      const {token} = req.body
      const admin = await Admin.findOne({tokens: {$in: [token]}}) || {}
      const updatedResult = await Admin.updateOne({_id: admin._id},{tokens: []})
      res.status(200).json({updatedResult})
    } catch(err){
      console.log(err)
      res.status(400).json(err.message)
    }
  }
  getAdmin = async (req,res) => {
    try {
      const admin = req.person
      res.status(200).json(admin)
    } catch(err){
      res.status(400).json(err.message)
    }
  }
  updateAdmin = async (req,res) => {
    try {
      const { name, cellphone } = req.body;
      const updated = await Admin.updateOne({_id: req.person._id},{name, cellphone})
      res.status(200).json(updated)
    } catch(err){
      res.status(400).json(err.message)
    }
  }
  deleteAdmin = async (req,res) => {
    try {
      const { _id, courts } = req.person ;
      const deleted =  await Admin.deleteOne({_id})
      this.emit("adminDeleted", courts) 
      this.emit("courtDeleted", courts) 
      res.status(200).json(deleted)
    } catch(err){
      res.status(400).json(err.message)
    } 
  }
}

const adminService = new AdminService()
adminService.on("adminDeleted",adminSubscription.deleteCourtsFromAdmin)
adminService.on("courtDeleted",adminSubscription.deleteReservationsFromCourt)
module.exports = adminService