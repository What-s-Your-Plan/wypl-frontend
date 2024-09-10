import { axiosWithAccessToken } from '@/api/axios.ts';
import { AUTH }                 from '@/api/endpoint.ts';

export const deleteJsonWebTokens = async () => {
  const { data } = await axiosWithAccessToken.delete<BaseResponse<void>>(
    AUTH.V1.LOGOUT,
  );

  return data;
};
