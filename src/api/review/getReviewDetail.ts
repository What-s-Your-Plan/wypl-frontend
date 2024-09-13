import { axiosWithAccessToken } from '../axios';

import { REVIVE } from '@/api/endpoint.ts';

/* Request */
export type GetReviewPathVariable = {
  reviewId: string;
};

/* API */
export const getReviewDetail = async ({ reviewId }: GetReviewPathVariable) => {
  const { data } = await axiosWithAccessToken.get(
    `${REVIVE.V1.REVIEWS.DETAIL}/${reviewId}`,
  );

  return data;
};
