import { axiosWithAccessToken } from '../axios';

import { ReviewDetailData } from '@/@types/ReviewResponse';
import { REVIVE } from '@/api/endpoint.ts';

/* Request */
export type GetReviewPathVariable = {
  reviewId: string;
};

/* Response */
export type GetReviewResponse = ReviewDetailData;

/* API */
export const getReviewDetail = async ({ reviewId }: GetReviewPathVariable) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<GetReviewResponse>
  >(`${REVIVE.V1.REVIEWS.DETAIL}/${reviewId}`);

  return data;
};
