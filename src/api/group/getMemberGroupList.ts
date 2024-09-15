import { axiosWithAccessToken } from '../axios';

import { GroupSummaryData } from '@/@types/Group';
import { GROUP } from '@/api/endpoint.ts';

export type MemberGroupsResponse = {
  group_count: number;
  invited_group_count: number;
  groups: GroupSummaryData[];
  invited_groups: GroupSummaryData[];
};

export const getMemberGroupList = async () => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<MemberGroupsResponse>
  >(GROUP.V1.GROUPS.MEMBER.BASE);

  return data;
};
