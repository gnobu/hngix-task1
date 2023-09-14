import mongoose from "mongoose"

export interface PersonAttrs {
    name: string
}

interface IPerson extends mongoose.Document {
    name: string
}

export interface PersonModel extends mongoose.Model<IPerson> {
    build(attrs: PersonAttrs): IPerson
}

const personSchema = new mongoose.Schema<IPerson, PersonModel>({
    name: { type: String, required: true, unique: true }
}, {
    toJSON: {
        getters: true,
        transform(doc, ret, options) {
            delete ret._id
            delete ret.__v
        },
    },
    toObject: { getters: true }
})

personSchema.statics.build = (attrs: PersonAttrs) => {
    return new Person(attrs)
}

const Person = mongoose.model<IPerson, PersonModel>('Person', personSchema)
export default Person