import { ReviewContent } from '@/objects/ReviewContent.ts';

type ReviewType = 'text' | 'picture' | 'emotion' | 'weather' | 'kpt' | '4f';

export interface ReviewDetailData {
  review_id: number;
  created_at: string; //ex) "2024-04-22T12:44:00"
  title: string;
  thumbnail_content: ReviewContent;
}
