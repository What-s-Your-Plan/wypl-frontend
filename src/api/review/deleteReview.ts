import { axiosWithAccessToken } from '../axios';

import { REVIVE } from '@/api/endpoint.ts';

/* Request */
export type DeleteReviewPathVariable = {
  review_id: string;
};

/* Response */
export type DeleteReviewResponse = {
  review_id: number;
};

/* API */
export const deleteReview = async ({ review_id }: DeleteReviewPathVariable) => {
  const { data } = await axiosWithAccessToken.delete<
    BaseResponse<DeleteReviewResponse>
  >(`${REVIVE.V1.REVIEWS.BASE}/${review_id}`);

  return data;
};
