import { axiosWithAccessToken } from '@/api/axios';
import { MEMBER } from '@/api/endpoint.ts';
import { LabelColorType } from '@/styles/Theme';
/* Request */
export type UpdateLabelColorRequest = {
  color: LabelColorType;
};

/* Response */
export type UpdateLabelColorResponse = {
  color: LabelColorType;
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
