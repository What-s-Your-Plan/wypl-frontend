import { ReviewContent } from '@/objects/ReviewContent.ts';

export type Review = {
  review_id: number;
  created_at: string; //ex) "2024-04-22T12:44:00"
  title: string;
  thumbnail_content: ReviewContent;
};

interface ReviewDetailData {
  review_id: number;
  created_at: string;
  title: string;
  schedule: ScheduleSimpleResponse;
  contents: ReviewContent[];
}
