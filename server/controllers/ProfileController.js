import _profileService from '../services/ProfileService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'


//PUBLIC
export default class ProfileController {
  constructor() {
    this.router = express.Router()
      .get('/:id', this.getById)
      .use(Authorize.authenticated)
      .post('', this.create)
      .put('/:id', this.edit)
      .use(this.defaultRoute)
  }

  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _profileService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async getById(req, res, next) {
    try {
      let data = await _profileService.getById(req.params.id, req.session.uid)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _profileService.edit(req.params.id, req.session.uid, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

}


