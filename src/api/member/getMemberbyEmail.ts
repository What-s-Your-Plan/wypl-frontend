import { axiosWithAccessToken } from '../axios';

import { MEMBER } from '@/api/endpoint.ts';

/* Request */
export type FindMemberByEmailParams = {
  email: string;
  size: number;
};

/* Response */
export type FindMemberByEmailResponse = {
  members: SearchMemberForCreateGroupData[];
  member_count: number;
};

/* API */
export const getMemberByEmail = async (params: FindMemberByEmailParams) => {
  return await axiosWithAccessToken
    .get<
      BaseResponse<FindMemberByEmailResponse>
    >(MEMBER.V1.MEMBERS.BASE, { params })
    .then((res) => {
      return res.data.body!;
    });
};
