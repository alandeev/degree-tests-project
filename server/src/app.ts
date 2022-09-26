import express from 'express'
import path from 'path'

import routes from './routers'

const app = express()

// Configs
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// Routers
app.use('/api', routes)

export default app
