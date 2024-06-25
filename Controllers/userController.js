import User from "../Models/userModel.js";
import nodemailer from "nodemailer";
export const viewstudents = async (req, res, next) => {
  try {
    const students = await User.find().populate("courses");

    res.send(students);
  } catch (error) {
    next(error);
  }
};

export const studentdetails = async (req, res, next) => {
  try {
    const username = req.body.learner;
    const student = await User.findOneAndUpdate(
      { username: req.body.learner },
      {
        performance: req.body.performance,
        assessment: req.body.assessment,
        mentorname: req.body.mentor,
      }
    );
    //console.log(student);
    student.save();
    const { password: passkey, ...rest } = student._doc;
    res.status(200).json({message:"Updated with details",rest});
  } catch (error) {
    next(error);
  }
};

export const postquery=async(req,res,next)=>{
  try {
    const  email = req.body.email;
    const username = req.body.username;
    const query = req.body.query;
    const userinfo = await User.findOne({ email });
    if (!userinfo) {
      return res.status(401).json({ message: "User not found" });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.PASSMAIL,
        pass: process.env.PASSKEY,
      },
    });

    const mailOptions = {
      from: process.env.PASSMAIL,
      to: email,
      subject: "Query ",
      html: `
              <p>Dear ${username}</p>
              <p> You had posted a new query</p>
              <p>${query}</p>
              <p>Your query will be processed at the earliest and will get notification through email
              <p>Thank you,</p>
              <p>Suss Out</p>
            `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Query sent successfully" });
  } catch (error) {
    next(error)
  }
}
