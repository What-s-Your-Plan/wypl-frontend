import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';
import { BgColors } from '@/assets/styles/colorThemes';

/* Request */
export type GroupInfoUpdatePathVariable = {
  groupId: number;
};

export type GroupInfoUpdateRequest = {
  name: string;
  color: BgColors;
};

/* Response */
export type GroupInfoUpdateResponse = {
  id: number;
  name: string;
  color: BgColors;
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
