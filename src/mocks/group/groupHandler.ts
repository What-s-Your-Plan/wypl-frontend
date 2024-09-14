import { RequestHandler } from 'msw';

import getMemberGroup from '@/mocks/group/v1/groups/getMemberGroup.ts';
import getMemberGroupList from '@/mocks/group/v1/groups/getMemberGroupList.ts';

export const groupHandler: RequestHandler[] = [
  getMemberGroup,
  getMemberGroupList,
];
