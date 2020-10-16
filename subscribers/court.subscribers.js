const Admin =require('../models/admin.model')
module.exports = {
  addCourtIdToAdmin: async (court) => {
    try {
      const { _id, adminId } = court
      const admin = await Admin.findById(adminId)
      admin.courts.push(_id)
      await admin.save({validateBeforeSave: false})
    } catch(err){

    }
  }
}