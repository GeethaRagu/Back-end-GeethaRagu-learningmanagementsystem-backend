import mongoose from "mongoose";

const mentorschema = mongoose.Schema({
    mentorName:String,
    mentorEmail:String,
    
});
const Mentor = mongoose.model("Mentor",mentorschema);

export default Mentor;