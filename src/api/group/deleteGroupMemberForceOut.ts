import { axiosWithAccessToken } from '../axios';

import { API_PATH } from '@/constants/Path';

/* Request */
export type DeleteGroupMemberForceOutPathVariable = {
  groupId: number;
};

export type DeleteGroupMemberForceOutRequest = {
  member_id: number;
};

/* Response */
export type DeleteGroupMemberForceOutResponse = {
  member_id: number;
};

/* API */
export const deleteGroupMemberForceOut = async (
  { groupId }: DeleteGroupMemberForceOutPathVariable,
  request: DeleteGroupMemberForceOutRequest,
) => {
  const { data } = await axiosWithAccessToken.patch<
    BaseResponse<DeleteGroupMemberForceOutResponse>
  >(API_PATH.GROUP.FORCE_OUT.replace(':groupId', groupId.toString()), request);

  return data;
};
