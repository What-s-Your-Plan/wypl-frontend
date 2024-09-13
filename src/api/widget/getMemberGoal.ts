import { axiosWithAccessToken } from '../axios';

import { SIDE } from '@/api/endpoint.ts';

/* Request */
export type GetMemberGoalPathVariable = {
  memberId: number;
};

/* Response */
export type GetMemberGoalResponse = {
  goal_id: number;
  content: string;
};

/* API */
export const getMemberGoal = async ({
  memberId,
}: GetMemberGoalPathVariable) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<GetMemberGoalResponse>
  >(`${SIDE.V1.GOAL}/${memberId}`);

  return data;
};
