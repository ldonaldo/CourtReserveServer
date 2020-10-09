const EventEmiter = require("events")
const Admin = require("../models/admin.model")
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
      await admin.updateOne({tokens: [...admin.tokens, token]})
      res.status(200).json({token})
    } catch(err){
      console.log(err)
      res.status(401).json(err.message)
    }
  }
  logoutAdmin = async (req,res) => {    
    try{
      const {token} = req.body
      console.log(token)
      const admin = await Admin.findOne({tokens: {$in: [token]}}) || {}
      const updatedResult = await admin.updateOne({tokens: []})
      res.status(200).json({updatedResult})
    } catch(err){
      console.log(err)
      res.status(400).json(err.message)
    }
  }
}

const adminService = new AdminService()

module.exports = adminService