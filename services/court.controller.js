const EventEmiter = require("events")
const Court = require("../models/court.model")
const courtSubscribers = require("../subscribers/court.subscribers")

class CourtService extends EventEmiter {
  createNewCourt = async (req ,res) => {    
    try{
      const courtData = (({title, address, pricePerHour, openingTime, closingTime, adminId, courtPhotos}) => ({title, address, pricePerHour, openingTime, closingTime, adminId, courtPhotos}))(req.body)
      const court = await new Court(courtData)
      court.adminId = req.person._id
      this.emit("courtCreated", court)
      await court.save()      
      res.status(201).json({court})
    }catch(err){
      res.status(400).json(err.message)
    }
  }
  updateCourt = async (req,res) => {
    try {
      const {courtId, fields} = req.body;
      const {title, address, pricePerHour, courtPhotos} = fields
      const updatedCourt =  await Court.updateOne({_id: courtId},{title, address, pricePerHour, courtPhotos})
      res.status(200).json(updateCourt)
    } catch(err){
      res.status(400).json(err.message)
    }
  }
  getCourts = async (req,res) => {
    try {
      const courts = await Court.find({})
      res.status(200).json({courts})
    } catch(err){
      res.status(400).json(err.message)
    }   
  }
  getCourtsByUser = async (req,res) => {
    try {
      const { _id } = req.person
      const courts = await Court.find({adminId: _id })
      res.status(200).json({courts})
    } catch(err){
      res.status(400).json(err.message)  
    }
  }
}

const courtService = new CourtService()
courtService.on('courtCreated',courtSubscribers.addCourtIdToAdmin)
module.exports = courtService