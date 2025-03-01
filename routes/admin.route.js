require("dotenv").config();
const express = require("express");
const {authMiddleware,checkRole} = require("../middlewares/auth");
const userModel = require("../models/user.model");
const appointmentModel = require("../models/appointment.model");
const adminRouter = express.Router();
const objectsToCsv = require("objects-to-csv");
//Getting all users
adminRouter.get("/users", checkRole("admin"), async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) return res.status(400).json({ msg: "User not found" });
    res.status(200).json({ msg: "List of users" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to get users" });
  }
});
//Get specific user
adminRouter.get("/users/:id", checkRole("admin"), async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) return res.status(403).json({ msg: "User not Found" });
    res.status(200).json({ msg: "User Found" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to get the specific user" });
  }
});
//Delete user
adminRouter.delete(
  "/appointments",
  checkRole("admin"),
  async (req, res) => {
    try {
      const appointment = await appointmentModel.find();
      if (!appointment)
        return res.status(403).json({ msg: "Appointment not found" });
      await appointment.delete();
      res.status(200).json({ msg: "Appointment deleted successfull" });
    } catch (err) {
      res.status(500).json({ msg: "Failed to delete appointment" });
    }
  }
);
//Get reports
adminRouter.get("/reports", checkRole("admin"), async (req, res) => {
  try {
    const reports = await appointmentModel.find();
    const csvWriter = createObjectCsvWriter({
      path: "Appointments_report.csv",
      header: [

        { id: "patientId", title: "patientId" },
        { id: "doctorId", title: "doctorId" },
        { id: "appointments", title: "appointments" },
      ],
    });
    const json2csvParser = new Parser({appointments});
    const csv = json2csvParser.parse(appointment);
    
    const filePath = path.join(__dirname, "../reports/Appointments_report.csv");
    fs.writeFileSync(filePath, csv);
    
    res.download(filePath, "Appointments_report.csv", (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error generating report" });
      }
    });
    await csvWriter.writeRecords(reports);
    res.send("CSV report generated successfully!");
  } catch (err) {
    res.status(500).json({ msg: "Failed to get the report" });
  }
});

//Delete   
adminRouter.delete("/:id",checkRole("admin"),async(req,res)=>{

  cron.schedule("*/2 * * * * *", async () => {
    try {
      const result = await taskModel.deleteMany({
        appointmentDateTime: { $lt: new Date() },
      });
      
      if (result.deletedCount > 0) {
        res.status(200).json({ msg: "Expired appointments deleted" });
      } else {
        res.status(200).json({ msg: "No Expired appointments to delete" });
      }
      0;
    } catch (err) {
      res.status(500).json({ msg: "Failed to delete the Expired tasks" });
    }
  });
  
})

module.exports=adminRouter