export interface RequestOptions {
  body?: any
  headers?: any
  query_params?: any
  path_params?: any
}

export type ResponseOptions = Record<string, any>

export type ControllerFn = (request: RequestOptions) => Promise<ResponseOptions | undefined>
