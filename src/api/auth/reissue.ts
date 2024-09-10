import { IssueTokenResponse } from '@/api/auth/issueTokens.ts';
import { axios } from '@/api/axios.ts';
import { AUTH } from '@/api/endpoint.ts';

/* Request */
export type ReissueTokenParams = {
  refresh_token: string;
};

/* Response */
export type ReissueTokenResponse = IssueTokenResponse;

/* API */
export const reissueTokens = async (params: ReissueTokenParams) => {
  const { data } = await axios.put<BaseResponse<ReissueTokenResponse>>(
    AUTH.V1.REISSUE,
    { params },
  );

  return data;
};
