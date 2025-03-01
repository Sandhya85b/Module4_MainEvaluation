require("dotenv").config();
const express = require("express");
const jest = require("jest");
const connectToDb = require("./config/mongo.config");
const adminRouter = require("./routes/admin.route");
const doctorRouter = require("./routes/doctor.routes");
const morganLogger = require("./middlewares/logger");
const app = express.Router();
const morganLogger = require("./middlewares/logger");
const accesslogStream = fs.createWriteStream(logfilepath, { flags: "a" });
app.use(morgan("combined", { stream: accesslogStream }));
app.use(morganLogger);
const PORT = Number(process.env.PORT);
app.use(express.json());

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);

connectToDb();
// app.listen(PORT, () => {
//   try {
//     console.log(`Connected to Server ${PORT}`);
//   } catch (err) {
//     console.log("Failed connecting to server");
//   }
// });

module.exports = app;
