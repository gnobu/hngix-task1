import express, { RequestHandler } from 'express'
import { body } from 'express-validator'

import { IController } from "../interfaces/controller.interface"
import { PersonService } from '../services/person.service'
import { validateRequest } from '../middleware/validate-request.middleware'
import { NotFoundError } from '../errors/not-found.error'

export class PersonController implements IController {
    router = express.Router()
    path = '/api'
    constructor(private _personService: PersonService) {
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.post(this.path, [
            body('name')
                .not().isEmpty()
                .trim()
                .isString()
                .withMessage('Name is required')
        ], validateRequest, this._createPerson)
        this.router.get(this.path, this._findPersons)
        this.router.get(`${this.path}/:id`, this._findPerson)
        this.router.put(`${this.path}/:id`, [
            body('name')
                .not().isEmpty()
                .trim()
                .isString()
                .withMessage('Name is required')
        ], validateRequest, this._updatePerson)
        this.router.delete(`${this.path}/:id`, this._deletePerson)
    }

    private _createPerson: RequestHandler = async (req, res) => {
        const { name } = req.body
        const person = await this._personService.create({ name })
        res.status(201).json(person)
    }
    private _findPersons: RequestHandler = async (req, res) => {
        const persons = await this._personService.findMany()
        res.json(persons)
    }
    private _findPerson: RequestHandler = async (req, res) => {
        const { id } = req.params
        const person = await this._personService.findOne(id)
        res.json(person)
    }
    private _updatePerson: RequestHandler = async (req, res) => {
        const { id } = req.params
        const { name } = req.body
        const person = await this._personService.update(id, { name })
        res.json(person)
    }
    private _deletePerson: RequestHandler = async (req, res) => {
        const { id } = req.params
        const person = await this._personService.delete(id)
        if (!person) {
            throw new NotFoundError()
        }
        res.status(200).json(person)
    }
}