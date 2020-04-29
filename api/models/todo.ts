//  https://jsonplaceholder.typicode.com/todos

export interface IGetTodoListResponse {
  userId: number;
  id: number;
  title: string;
  completed: Boolean;
}

export interface IPostTodoListRequest {
  userId: number;
  id: number;
  title: string;
  completed: Boolean;
}
