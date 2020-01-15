import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Profile = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    userImage: { type: String },
    jobTitle: { type: String, required: false },
    jobSkills: { type: String, required: true },
    interviewerStatus: { type: Boolean, required: true },
    intervieweeStatus: { type: Boolean, required: true },
    authorId: { type: ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default Profile;
