import { axiosWithAccessToken } from '../axios';

import { ReviewDetailData } from '@/@types/Review';
import { REVIVE } from '@/api/endpoint.ts';

/* Request */
export type GetReviewListPathVariable = {
  viewType: string;
};

export type GetReviewListParams = {
  lastReviewId: number;
};

/* Response */
export type GetReviewListResponse = {
  review_count: number;
  reviews: ReviewDetailData[];
};

/* API */
export const getReviewList = async (
  { viewType }: GetReviewListPathVariable,
  params: GetReviewListParams | undefined,
) => {
  if (params !== undefined) {
    const { data } = await axiosWithAccessToken.get<
      BaseResponse<GetReviewListResponse>
    >(`${REVIVE.V1.REVIEWS.BASE}/${viewType}`, { params });
    return data;
  }
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<GetReviewListResponse>
  >(`${REVIVE.V1.REVIEWS.BASE}/${viewType}`);
  return data;
};

export default getReviewList;
