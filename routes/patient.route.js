const express = require("express");
const { checkRole } = require("../middlewares/auth");
const appointmentModel = require("../models/appointment.model");
const patientRouter = express.Router();
//Book new appointment
patientRouter.post("/appointments", checkRole("patient"), async (req, res) => {
  try {
    const appointment = await appointmentModel.findOne(req.body.patientId);
    if (appointment) {
      return res.status(403).json({ msg: "already booked the appointment " });
    }
    const newAppointment = new appointmentModel({
      patientId,
      doctorId,
      appointmentDateTime,
      symptoms,
      isDiagnosisDone,
    });
    await newAppointment.save();
    res.status(201).json({ msg: "Booked appointment successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to book the appointments" });
  }
});
//Get patient appointments
patientRouter.get("/appointments", checkRole("patient"), async (req, res) => {
  try {
    const appointment = await appointmentModel.findOne(req.body.patientId);
    if (!appointment) {
      return res.status(403).json({ msg: "No appointments found " });
    }

    res.status(200).json({ msg: "All Booked appointments" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to get  booked the appointments" });
  }
});
//Update the appointment only if more than 24hrs remains
patientRouter.put(
  "/appointments/:id",
  checkRole("patient"),
  async (req, res) => {
    try {
      const appointment = await appointmentModel.findOne(req.body.patientId);
      if (!appointment) {
        return res.status(403).json({ msg: "No appointments found " });
      }

      if (appointment.appointmentDateTime > 24*60*60*100) {
        const UpdateAppointment = new appointmentModel({
          doctorId,
          appointmentDateTime,
          symptoms,
          isDiagnosisDone,
        });
        await UpdateAppointment.save();
        res.status(201).json({ msg: "Updated appointment successfully" });
      }else{
        res.status(403).json({msg:"Exceed the date,Failed to update"})
      }
    } catch (err) {
      res.status(500).json({ msg: "Failed to update the appointments" });
    }
  }
);
//

module.exports = patientRouter;
