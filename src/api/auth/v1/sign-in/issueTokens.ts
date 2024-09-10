import { axios } from '@/api/axios.ts';
import { AUTH }  from '@/api/endpoint.ts';

export const issueTokens = async (
  params: IssueTokenParams,
  provider: string,
) => {
  const { data } = await axios.post<BaseResponse<IssueTokenResponse>>(
    AUTH.V1.SIGN_IN.BASE + `/${provider}`,
    { params },
  );

  return data;
};
