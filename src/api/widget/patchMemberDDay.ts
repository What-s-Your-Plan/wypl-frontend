import { axiosWithAccessToken } from '../axios';

import { SIDE } from '@/api/endpoint.ts';

/* Request */
export type PatchMemberDDayPathVariable = {
  memberId: number;
};

export type PatchMemberDDayRequest = {
  title: string;
  dDay: string;
};

/* Response */
export type PatchMemberDDayResponse = DDayData;

async function patchMemberDDay(
  { memberId }: PatchMemberDDayPathVariable,
  request: PatchMemberDDayRequest,
) {
  const { data } = await axiosWithAccessToken.patch<
    BaseResponse<PatchMemberDDayResponse>
  >(`${SIDE.V1.D_DAY}/${memberId}`, request);

  return data;
}

export default patchMemberDDay;
