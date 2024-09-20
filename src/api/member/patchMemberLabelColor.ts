import { axiosWithAccessToken } from '@/api/axios';
import { MEMBER }          from '@/api/endpoint.ts';
import { LabelColorsType } from '@/styles/colorThemes.ts';

/* Request */
export type UpdateLabelColorRequest = {
  color: LabelColorsType;
};

/* Response */
export type UpdateLabelColorResponse = {
  color: LabelColorsType;
};

/* API */
export const patchMemberLabelColor = async (
  request: UpdateLabelColorRequest,
) => {
  const { data } = await axiosWithAccessToken.patch<
    BaseResponse<UpdateLabelColorResponse>
  >(MEMBER.V1.MEMBERS.COLOR, request);

  return data;
};
