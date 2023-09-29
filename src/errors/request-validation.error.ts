import { ValidationError } from 'express-validator'
import { CustomError } from './custom.error'

export class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters')
  }

  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path }
      }
      return { message: err.msg }
    })
  }
}

export class JoiValidationError extends CustomError {
  statusCode = 400

  constructor(public errors: string) {
    super('Invalid request parameters')
  }

  serializeErrors() {
    return JSON.parse(this.errors)
  }
}
