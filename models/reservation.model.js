const  {Schema, model} = require("mongoose")

const reservationSchema = new Schema ({
  courtId:{
    type:Schema.Types.ObjectId,
    ref:"Court"
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  date: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },  
  endTime: {    
    type: String,
    required: true
  },  
  month: {    
    type: Number,
    required: true
  }, 
  year: {    
    type: Number,
    required: true
  }, 
  paidReserve:{
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }  
},{
  timestamps: true
})


const Reservation = new model("Reservation", reservationSchema)
module.exports = Reservation