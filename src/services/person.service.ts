import mongoose, { FilterQuery, UpdateQuery } from "mongoose"
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
    async findOne(param: string) {
        const filter = this._processFilter(param)
        return await this._personModel.findOne(filter)
    }
    async update(param: string, fields: UpdateQuery<PersonModel>) {
        const filter = this._processFilter(param)
        return await this._personModel.findOneAndUpdate(filter, fields, { new: true, runValidators: true })
    }
    async delete(param: string) {
        const filter = this._processFilter(param)
        const person = await this._personModel.findOneAndDelete(filter)
        return person
    }

    _processFilter(param: string) {
        if (mongoose.Types.ObjectId.isValid(param)) return { _id: param }
        return { name: param }
    }
}