import { axiosWithAccessToken } from '../axios';

import { API_PATH } from '@/constants/Path';

/* Request */
export type GroupInviteAcceptedPathVariable = {
  groupId: number;
};

/* API */
export const patchGroupInviteAccepted = async ({
  groupId,
}: GroupInviteAcceptedPathVariable) => {
  const { data } = await axiosWithAccessToken.patch<BaseResponse<void>>(
    API_PATH.GROUP.INVITE.replace(':groupId', groupId.toString()),
  );

  return data;
};

export default patchGroupInviteAccepted;
