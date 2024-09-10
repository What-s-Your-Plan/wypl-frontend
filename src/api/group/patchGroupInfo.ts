import { axiosWithAccessToken } from '../axios';

import { BgColors } from '@/assets/styles/colorThemes';
import { API_PATH } from '@/constants/Path';

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
  >(`${API_PATH.GROUP.BASE}/${groupId}`, request);

  return data;
};
