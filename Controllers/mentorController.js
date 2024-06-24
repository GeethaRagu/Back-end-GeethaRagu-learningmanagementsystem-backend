import Mentor from "../Models/mentorModel.js";

export const createMentor = async (req, res, next) => {
  try {
    const newMentor = new Mentor(req.body);
    await newMentor.save();
    res.status(200).json({ message: "Mentor Created successfully", newMentor });
  } catch (error) {
    next(error);
  }
};

export const getmentors = async(req,res)=>{
    try {
        const mentordetails = await Mentor.find();
        res.send(mentordetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error in mentor get method"});
        
    }
}