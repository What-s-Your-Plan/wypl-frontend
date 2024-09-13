import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';
import { BgColors } from '@/assets/styles/colorThemes';

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
    GROUP.V1.GROUPS.MEMBER.PERSONAL_COLOR.replace(
      ':groupId',
      groupId.toString(),
    ),
    request,
  );

  return data;
};
