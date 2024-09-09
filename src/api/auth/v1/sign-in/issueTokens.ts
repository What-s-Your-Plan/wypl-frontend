import { axios } from '@/api/axios.ts';
import { AUTH_ENDPOINT } from '@/api/endpoint.ts';

export const issueTokens = async (
  params: IssueTokenParams,
  provider: string,
) => {
  const { data } = await axios.post<BaseResponse<IssueTokenResponse>>(
    AUTH_ENDPOINT.V1.SIGN_IN.BASE + `/${provider}`,
    { params },
  );

  return data;
};
