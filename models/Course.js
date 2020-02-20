const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title"]
  },
  description: {
    type: String,
    required: [true, "Please add a desceription"]
  },

  weeks: {
    type: String,
    required: [true, "Please add no of weeks"]
  },

  tuition: {
    type: Number,
    required: [true, "Please add tution cost"]
  },

  minimumSkill: {
    type: String,
    required: [true, "Please add Min Skill"],
    enum: ["beg", "intermediate", "advanced"]
  },

  scolarshipAvailable: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  }
});
module.exports = mongoose.model("Course", CourseSchema);
