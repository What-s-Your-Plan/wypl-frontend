import { axios } from '@/api/axios.ts';
import { AUTH }  from '@/api/endpoint.ts';

/* Request */
export type IssueTokenPathVariable = {
  provider: string;
};

export type IssueTokenParams = {
  code: string;
};

/* Response */
export type IssueTokenResponse = {
  member_id: number;
  access_token: string;
  refresh_token: string;
};

/* API */
export const issueTokens = async (
  { provider }: IssueTokenPathVariable,
  params: IssueTokenParams,
) => {
  const { data } = await axios.post<BaseResponse<IssueTokenResponse>>(
    `${AUTH.V1.SIGN_IN.BASE}/${provider}`,
    { params },
  );

  return data;
};
