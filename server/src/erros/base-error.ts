class BaseError extends Error {
  message
  status
  constructor (message, status = 400) {
    super(message)
    this.message = message
    this.status = status
  }
}

export default BaseError
