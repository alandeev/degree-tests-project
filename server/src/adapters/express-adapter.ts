import { ControllerFn } from '../models/request'

const expressAdapter = (controllerFn: ControllerFn) => {
  return async function (req, res) {
    try {
      const result = await controllerFn({
        body: req.body,
        headers: req.headers,
        path_params: req.params,
        query_params: req.params,
      })

      if (!result) {
        return res.status(204).send()
      }

      return res.status(200).json(result)
    } catch (error) {
      console.error({
        message: error.message,
        stack: error.stack,
      })

      return res.status(error.status).json({ // statusCode 400 fixo propositalmente só pra testar mesmo
        status: 'error',
        message: error.message, // sei que é falha de seguranca, mas é apenas pra testar!
      })
    }
  }
}

export default expressAdapter
