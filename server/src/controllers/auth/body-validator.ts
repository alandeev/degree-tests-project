import * as Z from 'zod'

import BaseError from '../../erros/base-error'

const Schema = Z.object({
  username: Z.string()
    .min(4)
    .max(16),
  password: Z.string()
    .min(4)
    .max(16),
})

const bodyValidator = (data) => {
  const resultParse = Schema.safeParse(data)
  if (!resultParse.success) {
    throw new BaseError('Validation error', 400)
  }

  return resultParse.data
}

export default bodyValidator
