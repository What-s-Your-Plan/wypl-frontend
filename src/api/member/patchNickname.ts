import { axiosWithAccessToken } from '@/api/axios';
import { MEMBER } from '@/api/endpoint.ts';

/* Request */
type UpdateNicknameRequest = {
  nickname: string;
};

/* Response */
export type UpdateNicknameResponse = {
  nickname: string;
};

/* API */
export const patchNickname = async (request: UpdateNicknameRequest) => {
  const { data } = await axiosWithAccessToken.patch<
    BaseResponse<UpdateNicknameResponse>
  >(MEMBER.V1.MEMBERS.NICKNAME, request);

  return data;
};
