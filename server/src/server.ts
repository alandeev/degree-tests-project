import express from 'express'

import routes from './routers'

const app = express()

app.use(express.json())

app.use('/api', routes)

app.listen(3000, () => console.log('Running port 3000'))
