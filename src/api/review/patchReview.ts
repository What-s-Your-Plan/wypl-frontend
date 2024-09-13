import { axiosWithAccessToken } from '../axios';

import { REVIVE } from '@/api/endpoint.ts';
import { ReviewContent } from '@/objects/ReviewContent.ts';

/* Request */
export type PathReviewPathVariable = {
  reviewId: number;
};

export type PatchReviewRequest = {
  title: string;
  schedule_id: number;
  contents: ReviewContent[];
};

/* Response */
export type PatchReviewResponse = {
  schedule_id: number;
  title: string;
  contents: ReviewContent[];
};

/* API */
export const patchReview = async (
  { reviewId }: PathReviewPathVariable,
  request: PatchReviewRequest,
) => {
  const { data } = await axiosWithAccessToken.patch<
    BaseResponse<PatchReviewResponse>
  >(`${REVIVE.V1.REVIEWS.BASE}/${reviewId}`, request);

  return data;
};
