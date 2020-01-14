import _profileService from '../services/ProfileService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'


//PUBLIC
export default class ProfileController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('/:id', this.getById)
      .put('/:id', this.edit)
      .use(this.defaultRoute)
  }

  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
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


