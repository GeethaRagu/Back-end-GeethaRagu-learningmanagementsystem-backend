import User from "../Models/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
dotenv.config();

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


export const forgotpassword = async (req, res,next) => {
  try {
    const { email } = req.body;
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

    userinfo.save();
    const clientUrl = process.env.CLIENT_URL;
    const mailOptions = {
      from: process.env.PASSMAIL,
      to: userinfo.email,
      subject: "Password Reset",
      html: `
              <p>Dear ${userinfo.username}</p>
              <p>We received a request to reset your password. 
              <p>Please click the following link to reset your password:</p>
              <a href="${clientUrl}/resetpassword/">Reset Password</a>
              <p>If you did not make this request, please ignore this email.</p>
              <p>Thank you,</p>
              <p>Suss Out</p>
            `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    next(error)
  }
};

export const resetpassword=async(req,res,next)=>{
  try {
    const email = req.body.email;
    const password = req.body.password;
    const resetuser = await User.findOne({email});
    console.log(resetuser);
    const hashnewPassword = await bcryptjs.hashSync(password, 10);
    const results = await User.updateOne({email:email},{email,password:hashnewPassword});
    //console.log(results);
    if(results.matchedCount===0){
      return res.status(404).json({message:"User not found"})
   }
   const rest = await User.find({email}).populate("courses");
 
   res.status(200).json({ message: "Password updated succeessfully", rest});
  } catch (error) {
    next(error)
  }
}