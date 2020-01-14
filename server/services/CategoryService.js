import mongoose from "mongoose";
import Category from "../models/Category";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Category", Category);

class CategoryService {
  async getAll() {
    return await _repository.find();
  }

  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async delete(id, userId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this category", 400);
    }
  }
}

const _categoryService = new CategoryService();
export default _categoryService;
