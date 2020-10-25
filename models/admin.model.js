const  {Schema, model} = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {emailValidators, passwordValidators} = require("../utils/validators")

const adminSchema = new Schema ({
  name:{
      type: String,
      required: true,
      trim: true
  },
  email:{
      type: String,
      required: true,
      lowercase: true,
      validate: emailValidators("admin")
  },
  password: {
      type: String,
      required: true,
      validate: passwordValidators.bind(this)
  },
  cellphone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 13,
      trim: true
  },  
  tokens : [
      {
      type: String,
      }
  ],  
  profilePhoto: {
      type: String
  },
  courts: {
    type: [{type: Schema.Types.ObjectId, ref:"Court"}]
  },
},{
  timestamps: true
})

adminSchema.methods.generateAuthToken = async function () {
  return jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY, {expiresIn: "1 days"})
}
adminSchema.methods.encryptPassword = async function () {
  this.password = await bcrypt.hash(this.password, 8)
  return this.password
}
const Admin = new model("Admin", adminSchema)
module.exports = Admin