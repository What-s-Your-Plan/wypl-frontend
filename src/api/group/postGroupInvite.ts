import { axiosWithAccessToken } from '../axios';

import { API_PATH } from '@/constants/Path';

export type GroupInviteRequest = {
  member_id_list: number[];
};

async function postGroupInvite(groupId: number, request: GroupInviteRequest) {
  return await axiosWithAccessToken.post(
    API_PATH.GROUP.INVITE.replace(':groupId', groupId.toString()),
    request,
  );
}

export default postGroupInvite;
