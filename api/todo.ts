import { HttpHandler, Interceptor } from './helpers'
import { IGetTodoListResponse, IPostTodoListRequest } from './models'

class TodoHandler {
  private handler: HttpHandler;

  constructor () {
    this.handler = new HttpHandler('https://my-json-server.typicode.com/IsuoChen/json-server-test/todos')
  }

  @Interceptor({ handleError: true })
  getTodoListAsync (): Promise<IGetTodoListResponse[]> {
    return this.handler.get('')
  }

  @Interceptor({ handleError: true })
  postTodoListAsync (request: IPostTodoListRequest): Promise<boolean> {
    return this.handler.post('', request)
  }
}

export const todoHandler = new TodoHandler()

export default todoHandler
