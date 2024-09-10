import { UpdateNicknameRequest, UpdateNicknameResponse } from '@/@types/Member';
import { axiosWithAccessToken } from '@/api/axios';
import { API_PATH }             from '@/constants/Path';


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
