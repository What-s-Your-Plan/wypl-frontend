import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';

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
  >(
    GROUP.V1.GROUPS.MEMBER.FORCE_OUT.replace(':groupId', groupId.toString()),
    request,
  );

  return data;
};
