import {
  UpdateLabelColorRequest,
  UpdateLabelColorResponse,
} from '@/@types/Member';
import { API_PATH }             from '@/constants/Path';
import { axiosWithAccessToken } from '@/api/axios';


const patchMemberLabelColor = (request: UpdateLabelColorRequest) => {
  return axiosWithAccessToken
    .patch<
      BaseResponse<UpdateLabelColorResponse>
    >(API_PATH.MEMBER.COLOR, request)
    .then((res) => {
      return res.data.body!;
    });
};

export default patchMemberLabelColor;
