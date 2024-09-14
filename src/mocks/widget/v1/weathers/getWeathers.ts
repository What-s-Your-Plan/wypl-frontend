import { http, HttpResponse, RequestHandler } from 'msw';

import { SIDE } from '@/api/endpoint.ts';
import { WeatherResponse } from '@/api/widget/getWeather.ts';

const response: BaseResponse<WeatherResponse> = {
  message: '날씨 위젯 조회하였습니다.',
  body: {
    city: '서울',
    weather_id: 1,
    temp: 21,
    min_temp: 16,
    max_temp: 27,
    desc: '맑음',
    main: 'Clear',
    is_sunrise: true,
    update_time: '14:20 갱신',
  },
};

const getWeather: RequestHandler = http.get(
  `http://localhost:8080${SIDE.V1.WEATHER}`,
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getWeather;
