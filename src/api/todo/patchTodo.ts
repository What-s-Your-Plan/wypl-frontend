import { axiosWithAccessToken } from '../axios';

import { TODO } from '@/api/endpoint.ts';

/* Request */
export type PatchTodoPathVariable = {
  todoId: number;
};

export type PatchTodoRequest = {
  content: string;
};

/* API */
export const patchTodo = async (
  { todoId }: PatchTodoPathVariable,
  request: PatchTodoRequest,
) => {
  const { data } = await axiosWithAccessToken.patch<BaseResponse<void>>(
    `${TODO.V1.TODOS.BASE}/${todoId}`,
    request,
  );

  return data;
};
