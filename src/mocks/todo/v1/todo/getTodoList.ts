import { http, HttpResponse, RequestHandler } from 'msw';

import { TODO } from '@/api/endpoint.ts';
import { GetTodoListResponse } from '@/api/todo/getTodoList.ts';

const response: BaseResponse<GetTodoListResponse> = {
  message: '메모를 조회했습니다.',
  body: {
    todo_count: 2,
    member_id: 1,
    nick_name: '와플',
    todos: [
      {
        todo_id: 1,
        content: '운동',
        is_completed: true,
      },
      {
        todo_id: 2,
        content: '공부',
        is_completed: false,
      },
    ],
  },
};

const getTodoList: RequestHandler = http.get(
  `http://localhost:8080${TODO.V1.TODOS.BASE}`,
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getTodoList;
