import { axiosWithAccessToken } from '../axios';

import { TODO } from '@/api/endpoint.ts';

/* Request */
export type PostTodoRequest = {
  content: string;
};

/* API */
export const postTodo = async (request: PostTodoRequest) => {
  const { data } = await axiosWithAccessToken.post<BaseResponse<void>>(
    TODO.V1.TODOS.BASE,
    request,
  );

  return data;
};
