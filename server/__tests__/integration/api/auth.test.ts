import app from '../../../src/app'

const supertest = require('supertest')

describe('Router - [POST] api/auth', () => {
  it('should returns 200 (Ok) with token when username and password are valid', function (done) {
    supertest(app)
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'admin',
      })
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (!res) {
          return done(err)
        }

        expect(res.status).toBe(200)
        expect(res.text).toBe('{"success":true,"token":"user-token","message":"Usuario autenticado com sucesso!","user":{"id":1,"username":"admin"}}')
        return done()
      })
  })

  it('should returns 401 (BadRequest) when username does not exist', function (done) {
    supertest(app)
      .post('/api/login')
      .send({
        username: 'user-not-found',
        password: '123456',
      })
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (!res) {
          return done(err)
        }

        expect(res.status).toBe(401)
        expect(res.text).toBe('{"status":"error","message":"User not found"}')
        return done()
      })
  })

  it('should returns 401 (BadRequest) when password is invalid', function (done) {
    supertest(app)
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'invalid-password',
      })
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (!res) {
          return done(err)
        }

        expect(res.status).toBe(401)
        expect(res.text).toBe('{"status":"error","message":"Password is invalid"}')
        return done()
      })
  })
})
