import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';
import { LabelColorType } from '@/styles/Theme';

/* Request */
export type PersonalGroupColorUpdatePathVariable = {
  groupId: number;
};

export type PersonalGroupColorUpdateRequest = {
  color: LabelColorType;
};

/* Response */
export type PersonalGroupColorUpdateResponse = {
  color: LabelColorType;
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
