import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';

/* Request */
export type DeleteGroupWithDrawPathVariable = {
  groupId: number;
};

/* API */
export const deleteGroupWithdraw = async ({
  groupId,
}: DeleteGroupWithDrawPathVariable) => {
  await axiosWithAccessToken.delete<BaseResponse<void>>(
    GROUP.V1.GROUPS.MEMBER.WITHDRAW.replace(':groupId', groupId.toString()),
  );
};
