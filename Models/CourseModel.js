import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    coursename: {
      type: String,
      required: true,
    },
    coursecategory: {
      type: String,
      required: true,
   },
    coursedescription: {
      type: String,
      required: true,
    },
    courseprice: {
      type: String,
    },
    coursequantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Course = new mongoose.model("Course", courseSchema);

export default Course;
