import { axiosWithAccessToken } from '../axios';

import { GroupSummaryData } from '@/@types/Group';
import { API_PATH } from '@/constants/Path';

export type FindMemberGroupsResponse = {
  group_count: number;
  invited_group_count: number;
  groups: GroupSummaryData[];
  invited_groups: GroupSummaryData[];
};

export const getMemberGroupList = async () => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<FindMemberGroupsResponse>
  >(API_PATH.GROUP.MEMBER);

  return data;
};
