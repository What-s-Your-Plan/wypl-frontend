import { axiosWithAccessToken } from '../axios';

import { API_PATH } from '@/constants/Path';

/* Request */
export type DeleteGroupWithDrawPathVariable = {
  groupId: number;
};

/* API */
export const deleteGroupWithdraw = async ({
  groupId,
}: DeleteGroupWithDrawPathVariable) => {
  await axiosWithAccessToken.delete<BaseResponse<void>>(
    API_PATH.GROUP.WITHDRAW.replace(':groupId', groupId.toString()),
  );
};
