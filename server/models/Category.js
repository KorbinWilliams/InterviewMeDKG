import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Category = new Schema({
  name: { type: String, required: true },
}, { timestamps: true })


export default Category