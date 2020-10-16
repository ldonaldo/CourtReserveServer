const  {Schema, model} = require("mongoose")

const courtSchema = new Schema ({
  title:{
    type: String,
    required: true,
    trim: true,
  },
  address:{
    type: String,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  openingTime: {
    type: String,
    required: true
  },  
  closingTime : {    
    type: String,
    required: true
  },  
  adminId:{
    type:Schema.Types.ObjectId,
    ref:"Admin"
  },
  reservations:{
    type: [{type: Schema.Types.ObjectId, ref:"Reservation"}]
  },
},{
  timestamps: true
})


const Court = new model("Court", courtSchema)
module.exports = Court