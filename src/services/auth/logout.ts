import { API_PATH } from '@/constants/Path';
import { axiosWithAccessToken } from '@/services/axios';

const deleteJsonWebTokens = () => {
  return axiosWithAccessToken.delete<BaseResponse<void>>(API_PATH.AUTH.LOGOUT);
};

export default deleteJsonWebTokens;
