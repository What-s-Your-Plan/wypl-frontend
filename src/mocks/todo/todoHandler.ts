import { RequestHandler } from 'msw';

import getTodoList from '@/mocks/todo/v1/todo/getTodoList.ts';

export const todoHandler: RequestHandler[] = [getTodoList];
