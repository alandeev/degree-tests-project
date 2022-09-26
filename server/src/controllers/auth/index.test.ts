import BaseError from '../../erros/base-error'
import { getByUsername } from '../../repositories/users'

import authenticate from '.'
import bodyValidator from './body-validator'

jest.mock('../../repositories/users')
jest.mock('./body-validator')

describe('Controllers - Auth', () => {
  const getByUsernameMock = jest.mocked(getByUsername)
  const bodyValidatorMock = jest.mocked(bodyValidator)

  it('should authenticate user correctly', async () => {
    const bodyMock = {
      username: 'alan',
      password: '123456',
    }
    bodyValidatorMock.mockReturnValue(bodyMock)

    getByUsernameMock.mockResolvedValue({
      id: 1,
      ...bodyMock,
    })

    const result = await authenticate({
      body: bodyMock,
    })

    expect(result).toStrictEqual({
      success: true,
      message: 'Usuario autenticado com sucesso!',
      token: 'user-token',
      user: {
        id: 1,
        username: 'alan',
      },
    })

    expect(getByUsernameMock).toHaveBeenCalledTimes(1)
    expect(getByUsernameMock).toHaveBeenCalledWith('alan')
  })

  it('should throw error if user does not exist', async () => {
    const bodyMock = {
      username: 'not-found',
      password: 'not-found',
    }
    bodyValidatorMock.mockReturnValue(bodyMock)

    getByUsernameMock.mockResolvedValue(undefined)

    await expect(() => authenticate({
      body: bodyMock,
    }))
      .rejects
      .toThrowError(new BaseError('User not found', 401))
  })

  it('should throw error if password is invalid', async () => {
    const bodyMock = {
      username: 'alan',
      password: 'invalid-password',
    }
    bodyValidatorMock.mockReturnValue(bodyMock)

    getByUsernameMock.mockResolvedValue({
      id: 1,
      username: 'alan',
      password: '123456',
    })

    await expect(() => authenticate({
      body: {
        username: bodyMock.username,
        password: bodyMock.password,
      },
    }))
      .rejects
      .toThrowError(new BaseError('Password is invalid', 401))
  })
})
