import { FindMemberProfileResponse } from '@/@types/Member';
import { axiosWithAccessToken } from '@/api/axios';
import { API_PATH }             from '@/constants/Path';

const getMemberProfile = (memberId: number) => {
  return axiosWithAccessToken
    .get<
      BaseResponse<FindMemberProfileResponse>
    >(API_PATH.MEMBER.BASE + `/${memberId}`)
    .then((res) => {
      return res.data.body!;
    });
};

export default getMemberProfile;
