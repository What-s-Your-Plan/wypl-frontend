import { http, HttpResponse, RequestHandler } from 'msw';

import { REVIVE }            from '@/api/endpoint.ts';
import { GetReviewResponse } from '@/api/review/getReviewDetail.ts';
import {
  EmotionContent,
  FourFContent,
  WeatherContent,
}                            from '@/objects/ReviewContent.ts';

const response: BaseResponse<GetReviewResponse> = {
  message: '리뷰 상세 조회에 성공했습니다.',
  body: {
    review_id: 1,
    title: '공부하기 싫다',
    created_at: '2024-04-28T13:44:00',
    schedule: {
      schedule_id: 0,
      start_date: '2024-04-26T11:00:00',
      end_date: '2024-04-27T13:00:00',
      group_id: null,
      label: null,
      member_count: 1,
      title: '테니스 가기',
      category: 'MEMBER',
      members: [
        {
          member_id: 0,
          profile_image: null,
          nickname: '좌랑둥이',
        },
      ],
    },
    contents: [
      {
        blockType: 'emotion',
        description: '피곤해요',
        emoji: '/src/assets/icons/emoji/tired.svg',
      } as EmotionContent,
      {
        blockType: 'weather',
        description: '날씨 너무 좋음',
        weather: '/src/assets/icons/weather/sun.svg',
      } as WeatherContent,
      {
        blockType: '4f',
        facts: '팩트',
        feeling: '느낌',
        finding: '교훈',
        future: '향후 헹동',
      } as FourFContent,
    ],
  },
};

const getReviewDetail: RequestHandler = http.get(
  new RegExp(`http://localhost:8080${REVIVE.V1.REVIEWS.DETAIL}/\\d`),
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getReviewDetail;
