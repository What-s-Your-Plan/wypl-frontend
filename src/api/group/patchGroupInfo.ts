import { axiosWithAccessToken } from '../axios';

import { GROUP }           from '@/api/endpoint.ts';
import { LabelColorsType } from '@/styles/colorThemes.ts';

/* Request */
export type GroupInfoUpdatePathVariable = {
  groupId: number;
};

export type GroupInfoUpdateRequest = {
  name: string;
  color: LabelColorsType;
};

/* Response */
export type GroupInfoUpdateResponse = {
  id: number;
  name: string;
  color: LabelColorsType;
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
