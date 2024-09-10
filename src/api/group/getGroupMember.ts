import { axiosWithAccessToken } from '../axios';

import { GroupMemberData } from '@/@types/Group';
import { BgColors } from '@/assets/styles/colorThemes';
import { API_PATH } from '@/constants/Path';

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
  >(`${API_PATH.GROUP.BASE}/${groupId}`);

  return data;
};
