import { axios } from '@/api/axios.ts';
import { AUTH }  from '@/api/endpoint.ts';

export const reissueTokens = async (params: ReissueTokenParams) => {
  const { data } = await axios.put<BaseResponse<IssueTokenResponse>>(
    AUTH.V1.REISSUE,
    { params },
  );

  return data;
};
