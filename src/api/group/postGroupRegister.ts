import { axiosWithAccessToken } from '../axios';

import { BgColors } from '@/assets/styles/colorThemes';
import { API_PATH } from '@/constants/Path';

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
    API_PATH.GROUP.BASE,
    request,
  );

  return data;
};
