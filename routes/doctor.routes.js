const express = require("express");
const appointmentModel = require("../models/appointment.model");
const { checkRole } = require("../middlewares/auth");
const doctorRouter = express.Router();
//Get all assigned appointments
doctorRouter.get("/appointments",checkRole("doctor"), async (req, res) => {
  try {
    const appointments = await appointmentModel.find(req.params.doctorId);
    if (!appointments)
      return res.status(400).json({ msg: "Appointment not found" });
    res.status(200).json({ msg: "Appointments assigned to doctor" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to get the appointments related to doctor" });
  }
});
//Get specific appointments
doctorRouter.put("/appointments/:id",checkRole("doctor"),async(req,res)=>{
    try{
        const {fee,prescription,isDiagnosisDone}=req.body
        const appointment=await appointmentModel.findById(req.params.id)
        
        if(!appointment) return res.status(400).json({msg:"Appointment not found"})
            const updateAppointment=new appointmentModel({ fee,prescription,isDiagnosisDone})
        await updateAppointment.save()
            res.status(200).json({msg:"Updated appointment successfully"})
    }catch(err){
        res.status(500).json({msg:"Failed to update appointment"})
    }
})


module.exports=doctorRouter