import { axiosWithAccessToken } from '../axios';

import { BgColors } from '@/assets/styles/colorThemes';
import { API_PATH } from '@/constants/Path';

/* Request */
export type PersonalGroupColorUpdatePathVariable = {
  groupId: number;
};

export type PersonalGroupColorUpdateRequest = {
  color: BgColors;
};

/* Response */
export type PersonalGroupColorUpdateResponse = {
  color: BgColors;
};

export const patchPersonalGroupColor = async (
  { groupId }: PersonalGroupColorUpdatePathVariable,
  request: PersonalGroupColorUpdateRequest,
) => {
  const { data } = await axiosWithAccessToken.patch<
    BaseResponse<PersonalGroupColorUpdateResponse>
  >(
    API_PATH.GROUP.PERSONAL_COLOR.replace(':groupId', groupId.toString()),
    request,
  );

  return data;
};
