import { axios } from '@/api/axios.ts';
import { AUTH_ENDPOINT } from '@/api/endpoint.ts';

export const reissueTokens = async (params: ReissueTokenParams) => {
  const { data } = await axios.put<BaseResponse<IssueTokenResponse>>(
    AUTH_ENDPOINT.V1.REISSUE,
    { params },
  );

  return data;
};
