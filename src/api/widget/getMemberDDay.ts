import { axiosWithAccessToken } from '../axios';

import { SIDE } from '@/api/endpoint.ts';

/* Request */
export type GetMemberDDayPathVariable = {
  memberId: number;
};

/* Response */
export type GetMemberDDayResponse = DDayData;

/* API */
export const getMemberDDay = async ({
  memberId,
}: GetMemberDDayPathVariable) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<GetMemberDDayResponse>
  >(`${SIDE.V1.D_DAY}/${memberId}`);

  return data;
};
