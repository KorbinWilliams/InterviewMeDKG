import _categoryService from '../services/CategoryService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'


//PUBLIC
export default class CategoryController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }


  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) {
    try {
      let data = await _categoryService.getAll()
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getQuizesByCategoryId(req, res, next) {
    try {
      let data = await _categoryService.getQuizesByCategoryId(req.params.id)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _categoryService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await _categoryService.delete(req.params.id, req.session.uid)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}





