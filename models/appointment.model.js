const mongoose=require("mongoose")
const appointmentSchema=new mongoose.Schema({
    patientId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    doctorId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    appointmentDateTime:{type:Date},
    symptoms:{type:String},
    fees:{type:Number},
    prescription:{type:String},
    isDiagnosisDone:{type:Boolean}
})
module.exports=mongoose.model("appointment",appointmentSchema)