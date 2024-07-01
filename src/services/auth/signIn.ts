import { API_PATH } from '@/constants/Path';
import { axios } from '@/services/axios';

const issueTokens = (params: IssueTokenParams, provider: string) => {
  return axios
    .post<
      BaseResponse<IssueTokenResponse>
    >(API_PATH.AUTH.ISSUE_TOKENS + `/${provider}`, {}, { params })
    .then((res) => {
      return res.data.body!;
    });
};

export default issueTokens;
