import { axiosWithAccessToken } from '../axios';

import { REVIVE } from '@/api/endpoint.ts';

/* Request */
export type DeleteReviewPathVariable = {
  review_id: string;
};

/* API */
export const deleteReview = async ({ review_id }: DeleteReviewPathVariable) => {
  const { data } = await axiosWithAccessToken.delete(
    `${REVIVE.V1.REVIEWS.BASE}/${review_id}`,
  );

  return data;
};
