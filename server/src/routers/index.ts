import { Router } from 'express'

import expressAdapter from '../adapters/express-adapter'
import authenticateController from '../controllers/auth'

const routes = Router()

// Auth router
routes.post('/login', expressAdapter(authenticateController))

export default routes
