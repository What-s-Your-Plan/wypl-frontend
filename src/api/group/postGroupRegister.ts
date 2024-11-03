import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';
import { LabelColorType } from '@/styles/Theme';

/* Request */
export type GroupRegisterRequest = {
  name: string;
  member_id_list: Array<number>;
  color: LabelColorType;
};

/* Response */
export type GroupResponse = {
  id: number;
  name: string;
  color: LabelColorType;
};

/* API */
export const postGroupRegister = async (request: GroupRegisterRequest) => {
  const { data } = await axiosWithAccessToken.post<BaseResponse<GroupResponse>>(
    GROUP.V1.GROUPS.BASE,
    request,
  );

  return data;
};
