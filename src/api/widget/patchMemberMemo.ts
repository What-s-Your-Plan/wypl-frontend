import { axiosWithAccessToken } from '../axios';

import { SIDE } from '@/api/endpoint.ts';

/* Request */
export type PatchMemberMemoPathVariable = {
  memberId: number;
};

export type PatchMemberMemoRequest = {
  memo: string;
};

/* Response */
export type PatchMemberMemoResponse = {
  memo: string;
};

export const patchMemberMemo = async (
  { memberId }: PatchMemberMemoPathVariable,
  request: PatchMemberMemoRequest,
) => {
  const { data } = await axiosWithAccessToken.patch<
    BaseResponse<PatchMemberMemoResponse>
  >(`${SIDE.V1.MEMO}/${memberId}`, request);

  return data;
};
