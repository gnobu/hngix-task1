import { FilterQuery, UpdateQuery } from "mongoose"
import { PersonAttrs, PersonModel } from "../models/person.model"

export class PersonService {
    constructor(private _personModel: PersonModel) { }
    async create(dto: PersonAttrs) {
        const person = this._personModel.build(dto)
        await person.save()
        return person
    }
    async findMany(filter?: FilterQuery<PersonModel>) {
        return await this._personModel.find({ ...filter })
    }
    async findOne(id: string) {
        return await this._personModel.findById(id)
    }
    async update(id: string, fields: UpdateQuery<PersonModel>) {
        return await this._personModel.findByIdAndUpdate(id, fields, { new: true, runValidators: true })
    }
    async delete(id: string) {
        const person = await this._personModel.findByIdAndDelete(id)
        return person
    }
}