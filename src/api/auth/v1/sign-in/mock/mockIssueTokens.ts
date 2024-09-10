import { axios } from '@/api/axios.ts';
import { AUTH }  from '@/api/endpoint.ts';

export const mockIssueTokens = async (params: MockIssueTokenParams) => {
  const { data } = await axios.post<BaseResponse<IssueTokenResponse>>(
    AUTH.V1.SIGN_IN.MOCK,
    { params },
  );

  return data;
};
