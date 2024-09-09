import { axios } from '@/api/axios.ts';
import { AUTH_ENDPOINT } from '@/api/endpoint.ts';

export const mockIssueTokens = async (params: MockIssueTokenParams) => {
  const { data } = await axios.post<BaseResponse<IssueTokenResponse>>(
    AUTH_ENDPOINT.V1.SIGN_IN.MOCK,
    { params },
  );

  return data;
};
