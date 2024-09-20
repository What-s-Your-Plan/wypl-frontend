import { axiosWithAccessToken } from '../axios';

import { GroupMemberData } from '@/@types/Group';
import { GROUP }           from '@/api/endpoint.ts';
import { LabelColorsType } from '@/styles/colorThemes.ts';

/* Request */
export type GetGroupMemberPathVariable = {
  groupId: number;
};

/* Response */
export type GetGroupMembersResponse = {
  color: LabelColorsType;
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
