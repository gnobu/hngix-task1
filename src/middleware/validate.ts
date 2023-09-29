import Joi from 'joi'
import express from 'express'
import pick from '../utils/pick'
import { JoiValidationError } from '../errors/request-validation.error'

type SchemaObject = {
	params?: Joi.ObjectSchema,
	query?: Joi.ObjectSchema,
	body?: Joi.ObjectSchema
}
const schemaFields = ['params', 'query', 'body', 'file', 'files']
export default function validate(schema: SchemaObject) {
	return (req: express.Request, res: express.Response, next: express.NextFunction) => {
		const validSchema = pick(schema, schemaFields)
		const object = pick(req, Object.keys(validSchema))
		const { value, error } = Joi.compile(validSchema)
			.prefs({ errors: { label: 'key' }, abortEarly: false })
			.validate(object)

		if (error) {
			const body = {} as Record<string, any>
			const query = {} as Record<string, any>
			const errorMessage = {} as Record<string, any>
			error.details.map((details) => {
				switch (details.path[0]) {
					case 'body':
						body[details.path[1]] = details.message.replace(/"/g, "'")
						break
					case 'file':
						body[details.path[0]] = details.message.replace(/"/g, "'")
						break
					case 'query':
						query[details.path[1]] = details.message.replace(/"/g, "'")
						break
					default:
						break
				}
				console.log(details, 'Details Object')
			})

			Object.keys(body).length && (errorMessage.body = body)
			Object.keys(query).length && (errorMessage.query = query)

			return next(
				new JoiValidationError(JSON.stringify(errorMessage))
			)
		}
		Object.assign(req, value)
		return next()
	}
}
