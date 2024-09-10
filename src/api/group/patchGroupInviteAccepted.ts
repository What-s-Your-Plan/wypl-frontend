import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';

/* Request */
export type GroupInviteAcceptedPathVariable = {
  groupId: number;
};

/* API */
export const patchGroupInviteAccepted = async ({
  groupId,
}: GroupInviteAcceptedPathVariable) => {
  const { data } = await axiosWithAccessToken.patch<BaseResponse<void>>(
    GROUP.V1.GROUPS.MEMBER.INVITE.replace(':groupId', groupId.toString()),
  );

  return data;
};

export default patchGroupInviteAccepted;
