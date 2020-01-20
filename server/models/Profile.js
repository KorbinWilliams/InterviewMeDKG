import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Profile = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userImage: { type: String },
    jobTitle: { type: String },
    jobSkills: { type: String },
    interviewerStatus: { type: Boolean, default: true },
    intervieweeStatus: { type: Boolean, default: true },
    authorId: { type: ObjectId, ref: "User", required: true },
    userId: { type: ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default Profile;
