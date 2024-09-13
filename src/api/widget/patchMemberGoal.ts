import { axiosWithAccessToken } from '../axios';

import { SIDE } from '@/api/endpoint.ts';

/* Request */
export type PatchMemberGoalPathVariable = {
  memberId: number;
};

export type PatchMemberGoalRequest = {
  content: string;
};

/* Response */
export type PatchMemberGoalResponse = {
  goal_id: number;
  content: string;
};

/* API */
export const patchMemberGoal = async (
  { memberId }: PatchMemberGoalPathVariable,
  request: PatchMemberGoalRequest,
) => {
  const { data } = await axiosWithAccessToken.patch<
    BaseResponse<PatchMemberGoalResponse>
  >(`${SIDE.V1.GOAL}/${memberId}`, request);

  return data;
};
