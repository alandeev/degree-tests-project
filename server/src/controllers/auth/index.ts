import BaseError from '../../erros/base-error'
import { RequestOptions } from '../../models/request'
import { getByUsername } from '../../repositories/users'

import bodyValidator from './body-validator'

const authenticateController = async (request: RequestOptions) => {
  const body = bodyValidator(request.body)

  const user = await getByUsername(body.username) // Nao necessario uso de await pois nao é uma base real
  if (!user) {
    throw new BaseError('User not found', 401) // Retornando informacao especifica apenas de forma ilustrativa
  }

  if (user.password !== body.password) {
    throw new BaseError('Password is invalid', 401) // Retornando informacao especifica apenas de forma ilustrativa
  }

  return {
    success: true,
    token: 'user-token',
    message: 'Usuario autenticado com sucesso!',
    user: {
      id: user.id,
      username: user.username,
    },
  }
}

export default authenticateController
