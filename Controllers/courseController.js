import Course from "../Models/CourseModel.js";
import User from "../Models/userModel.js";
export const createcourse = async (req, res, next) => {
  const { coursename, coursecategory, coursedescription, courseprice } =
    req.body;
  try {
    const newCourse = new Course({
      coursename,
      coursecategory,
      coursedescription,
      courseprice,
    });
    await newCourse.save();
    res
      .status(200)
      .json({ message: "Course created Successfully", result: newCourse });
  } catch (error) {
    next(error);
  }
};

export const getcourse = async (req, res, next) => {
  try {
    const coursedetails = await Course.find();
    res.send(coursedetails);
  } catch (error) {
    next(error);
  }
};

export const addcourse = async (req, res, next) => {
  const userid = req.body.userId;
  try {
    const cuser = await User.findById(userid);
    cuser.courses = [
        ...cuser.courses,
        ...req.body.courses,
      ];
 await cuser.save();
  const user1 = await User.findById(userid).populate("courses");
  user1.save();
  const { password: passkey, ...rest } = user1._doc;
 // console.log(user1);
  res
      .status(200)
      .json({ message: "Course added Successfully", rest });
  } catch (error) {
    next(error)
  }
};


