import { RequestHandler } from 'msw';

import getReviewDetail from '@/mocks/review/v1/reviews/getReviewDetail.ts';
import getReviewList from '@/mocks/review/v1/reviews/getReviewList.ts';

export const reviewHandler: RequestHandler[] = [getReviewList, getReviewDetail];
