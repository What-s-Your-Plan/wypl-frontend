import { http, HttpResponse, RequestHandler } from 'msw';

import { REVIVE } from '@/api/endpoint.ts';
import { GetReviewListResponse } from '@/api/review/getReviewList.ts';
import { EmotionContent, WeatherContent } from '@/objects/ReviewContent.ts';

const response: BaseResponse<GetReviewListResponse> = {
  message: '리뷰 목록 조회에 성공했습니다.',
  body: {
    review_count: 2,
    reviews: [
      {
        review_id: 1,
        created_at: '2024-09-13T13:44:24.61404',
        thumbnail_content: {
          blockType: 'emotion',
          description: '피곤해요',
          emoji: '/src/assets/icons/emoji/tired.svg',
        } as EmotionContent,
        title: '공부하기 싫다',
      },
      {
        review_id: 2,
        created_at: '2024-09-13T13:44:24.614048',
        thumbnail_content: {
          blockType: 'weather',
          description: '날씨 너무 좋음',
          weather: '/src/assets/icons/weather/sun.svg',
        } as WeatherContent,
        title: '오늘도 공부하기 싫다',
      },
    ],
  },
};

const getReviewList: RequestHandler = http.get(
  new RegExp(`http://localhost:8080${REVIVE.V1.REVIEWS.BASE}/(NEWEST|OLDEST)`),
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getReviewList;
