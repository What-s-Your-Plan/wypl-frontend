import { axiosWithAccessToken } from '@/api/axios.ts';
import { AUTH_ENDPOINT } from '@/api/endpoint.ts';

export const deleteJsonWebTokens = async () => {
  const { data } = await axiosWithAccessToken.delete<BaseResponse<void>>(
    AUTH_ENDPOINT.V1.LOGOUT,
  );

  return data;
};
