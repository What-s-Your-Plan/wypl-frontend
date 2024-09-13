import { axiosWithAccessToken } from '@/api/axios';
import { TODO } from '@/api/endpoint.ts';

/* Response */
export type GetTodoListResponse = {
  todo_count: number;
  member_id: number;
  nick_name: string;
  todos: TodoData[];
};

/* API */
export const getTodoList = async () => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<GetTodoListResponse>
  >(TODO.V1.TODOS.BASE);

  return data;
};
