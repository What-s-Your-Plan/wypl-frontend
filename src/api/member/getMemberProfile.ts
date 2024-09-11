import { axiosWithAccessToken } from '@/api/axios';
import { MEMBER } from '@/api/endpoint.ts';

/* Request */
export type GetMemberProfileRequest = {
  memberId: number;
};

/* Response */
export type GetMemberProfileResponse = MemberProfileData;

/* API */
export const getMemberProfile = async ({
  memberId,
}: GetMemberProfileRequest) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<GetMemberProfileResponse>
  >(`${MEMBER.V1.MEMBERS.BASE}/${memberId}`);

  return data;
};
