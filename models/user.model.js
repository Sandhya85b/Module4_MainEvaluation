const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    mobileNumber: String,
    password: String,
    role: { type: String, enum: ["admin", "doctor", "patient"] },
    specialization: {
      type: String,
      enum: ["nerves", "lungs", "lungs", "skin"],
    },
    availableDays: {
      type: Date,
      enum: ["sun", "mon", "Tue", "wed", "Thu", "Fri", "sat"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);
