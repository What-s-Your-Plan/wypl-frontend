import { axiosWithAccessToken } from '../axios';

import { API_PATH } from '@/constants/Path';

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
    API_PATH.GROUP.INVITE.replace(':groupId', groupId.toString()),
    request,
  );
};
