import { axiosWithAccessToken } from '../axios';

import { TODO } from '@/api/endpoint.ts';

/* Request */
export type CheckTodoPathVariable = {
  todoId: string;
};

/* API */
export const checkTodo = async ({ todoId }: CheckTodoPathVariable) => {
  const { data } = await axiosWithAccessToken.patch<BaseResponse<void>>(
    `${TODO.V1.TODOS.BASE}/${todoId}`,
  );

  return data;
};

export default checkTodo;
