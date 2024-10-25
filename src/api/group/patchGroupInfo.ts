import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';
import { LabelColorType } from '@/styles/Theme';

/* Request */
export type GroupInfoUpdatePathVariable = {
  groupId: number;
};

export type GroupInfoUpdateRequest = {
  name: string;
  color: LabelColorType;
};

/* Response */
export type GroupInfoUpdateResponse = {
  id: number;
  name: string;
  color: LabelColorType;
};

export const patchGroupInfo = async (
  { groupId }: GroupInfoUpdatePathVariable,
  request: GroupInfoUpdateRequest,
) => {
  const { data } = await axiosWithAccessToken.patch<
    BaseResponse<GroupInfoUpdateResponse>
  >(`${GROUP.V1.GROUPS.BASE}/${groupId}`, request);

  return data;
};
