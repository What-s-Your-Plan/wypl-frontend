import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';

/* Request */
export type GroupInvitePathVariable = {
  groupId: number;
};

export type GroupInviteRequest = {
  member_id_list: number[];
};

/* API */
export const postGroupInvite = async (
  { groupId }: GroupInvitePathVariable,
  request: GroupInviteRequest,
) => {
  await axiosWithAccessToken.post<BaseResponse<void>>(
    GROUP.V1.GROUPS.MEMBER.INVITE.replace(':groupId', groupId.toString()),
    request,
  );
};
