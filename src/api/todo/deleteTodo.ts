import { axiosWithAccessToken } from '../axios';

import { TODO } from '@/api/endpoint.ts';

/* Request */
export type DeleteTodoPathVariable = {
  todoId: string;
};

/* API */
export const deleteTodo = async ({ todoId }: DeleteTodoPathVariable) => {
  const { data } = await axiosWithAccessToken.delete<BaseResponse<void>>(
    `${TODO.V1.TODOS.BASE}/${todoId}`,
  );

  return data;
};
