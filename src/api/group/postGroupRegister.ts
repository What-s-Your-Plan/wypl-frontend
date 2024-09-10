import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';
import { BgColors } from '@/assets/styles/colorThemes';

/* Request */
export type GroupRegisterRequest = {
  name: string;
  member_id_list: Array<number>;
  color: BgColors;
};

/* Response */
export type GroupResponse = {
  id: number;
  name: string;
  color: BgColors;
};

/* API */
export const postGroupRegister = async (request: GroupRegisterRequest) => {
  const { data } = await axiosWithAccessToken.post<BaseResponse<GroupResponse>>(
    GROUP.V1.GROUPS.BASE,
    request,
  );

  return data;
};
