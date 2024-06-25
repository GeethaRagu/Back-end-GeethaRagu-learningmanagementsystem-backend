import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      suite: {
        type: String,
      },
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    phone: {
      type: String,
    },
    profilePicture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    courses:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default:[]
    }],
    mentorname:{
      type: String,
    },
    performance:{
      type: String,
    
    },
    assessment:{
      type: String,
      
    },
  },
  { timestamps: true }
);
const User = new mongoose.model("User", userSchema);

export default User;
