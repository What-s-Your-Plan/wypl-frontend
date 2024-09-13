import { axiosWithAccessToken } from '../axios';

import { SIDE } from '@/api/endpoint.ts';

/* Request */
export type GetMemberMemoPathVariable = {
  memberId: number;
};

/* Response */
export type GetMemberMemoResponse = {
  memo: string;
};

export const getMemberMemo = async ({
  memberId,
}: GetMemberMemoPathVariable) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<GetMemberMemoResponse>
  >(`${SIDE.V1.MEMO}/${memberId}`);
  return data;
};
