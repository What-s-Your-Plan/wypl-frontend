import { axiosWithAccessToken } from '../axios';

import { REVIVE } from '@/api/endpoint.ts';
import { ReviewContent } from '@/objects/ReviewContent.ts';

/* Request */
export type PostReviewRequest = {
  title: string;
  schedule_id: number;
  contents: ReviewContent[];
};

/* Response */
export type PostReviewResponse = {
  review_id: number;
};

/* API */
export const postReview = async (request: PostReviewRequest) => {
  const { data } = await axiosWithAccessToken.post<
    BaseResponse<PostReviewResponse>
  >(REVIVE.V1.REVIEWS.BASE, request);

  return data;
};
