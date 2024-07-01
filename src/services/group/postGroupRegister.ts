import { axiosWithAccessToken } from '../axios';

import { BgColors } from '@/assets/styles/colorThemes';
import { API_PATH } from '@/constants/Path';

export type GroupResponse = {
  id: number;
  name: string;
  color: BgColors;
};

async function postGroupRegister(body: {
  name: string;
  member_id_list: Array<number>;
  color: string;
}) {
  return await axiosWithAccessToken
    .post<BaseResponse<GroupResponse>>(API_PATH.GROUP.BASE, body)
    .then((res) => {
      return res.data.body!;
    });
}

export default postGroupRegister;
