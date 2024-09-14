import { axiosWithAccessToken } from '../axios';

import { SearchMemberForCreateGroupData } from '@/@types/Member';
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
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<FindMemberByEmailResponse>
  >(MEMBER.V1.MEMBERS.BASE, { params });

  return data;
};
