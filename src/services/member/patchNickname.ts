import { UpdateNicknameRequest, UpdateNicknameResponse } from '@/@types/Member';
import { API_PATH } from '@/constants/Path';
import { axiosWithAccessToken } from '@/services/axios';

const patchNickname = (request: UpdateNicknameRequest) => {
  return axiosWithAccessToken
    .patch<
      BaseResponse<UpdateNicknameResponse>
    >(API_PATH.MEMBER.NICKNAME, request)
    .then((res) => {
      return res.data.body!;
    });
};

export default patchNickname;
