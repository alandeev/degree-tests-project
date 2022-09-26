import BaseError from '../../erros/base-error'

import bodyValidator from './body-validator'

describe('Controllers - Auth - BodyValidator', () => {
  it('should authenticate user correctly', () => {
    const body = {
      username: 'alan',
      password: '123456',
    }

    const result = bodyValidator(body)

    expect(result).toStrictEqual(body)
  })

  it('should throw error body is empty', () => {
    expect(() => bodyValidator(undefined))
      .toThrowError(new BaseError('Validation error', 400))
  })

  it('should throw error when username is not provided', () => {
    const body = {
      password: 'alan',
    }

    expect(() => bodyValidator(body))
      .toThrowError(new BaseError('Validation error', 400))
  })

  it('should throw error when password is not provided', () => {
    const body = {
      username: 'alan',
    }

    expect(() => bodyValidator(body))
      .toThrowError(new BaseError('Validation error', 400))
  })

  it('should throw error when username has no min size required', () => {
    const body = {
      username: 'ala',
      password: '123456',
    }

    expect(() => bodyValidator(body))
      .toThrowError(new BaseError('Validation error', 400))
  })

  it('should throw error when password has no min size required', () => {
    const body = {
      username: 'alandev',
      password: '123',
    }

    expect(() => bodyValidator(body))
      .toThrowError(new BaseError('Validation error', 400))
  })
})
