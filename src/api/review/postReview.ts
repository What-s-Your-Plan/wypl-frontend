import { axiosWithAccessToken } from '../axios';

import { ReviewContent } from '@/objects/ReviewContent.ts';

async function postReview(body: {
  title: string;
  schedule_id: number;
  contents: ReviewContent[];
}): Promise<number> {
  const response = await axiosWithAccessToken.post('/review/v1/reviews', body);
  console.log(response);
  return response.data.body.review_id;
}

export default postReview;
