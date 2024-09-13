import { axiosWithAccessToken } from '../axios';

import { GroupMemberData } from '@/@types/Group';
import { GROUP } from '@/api/endpoint.ts';
import { BgColors } from '@/assets/styles/colorThemes';

/* Request */
export type GetGroupMemberPathVariable = {
  groupId: number;
};

/* Response */
export type GetGroupMembersResponse = {
  color: BgColors;
  member_count: number;
  members: GroupMemberData[];
};

export const getGroupMember = async ({
  groupId,
}: GetGroupMemberPathVariable) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<GetGroupMembersResponse>
  >(`${GROUP.V1.GROUPS.BASE}/${groupId}`);

  return data;
};
