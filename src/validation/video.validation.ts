import Joi from 'joi'

const createVideoRecord = {
	body: Joi.object().keys({
		title: Joi.string().required(),
		video: Joi.optional()
	}),
	file: Joi.object().required().keys({
		fieldname: Joi.string().required(),
		originalname: Joi.string().required(),
		encoding: Joi.string().required(),
		mimetype: Joi.string().required(),
		size: Joi.number().required(),
		stream: Joi.object(),
		destination: Joi.string().required(),
		path: Joi.string().required(),
	}),
}

const uploadChunk = {
	body: Joi.object().keys({
		chunk: Joi.required(),
	})
}

const uploadChunkWMulter = {
	file: Joi.object().required().keys({
		fieldname: Joi.string().required(),
		originalname: Joi.string().required(),
		encoding: Joi.string().required(),
		mimetype: Joi.string().required(),
		size: Joi.number().required(),
		stream: Joi.object(),
		destination: Joi.string().required(),
		path: Joi.string().required(),
	}),
}

const deleteVideoRecord = {
	params: Joi.object().keys({
		id: Joi.string().required(),
	})
}

export default {
	createVideoRecord,
	uploadChunk,
	uploadChunkWMulter,
	deleteVideoRecord
}