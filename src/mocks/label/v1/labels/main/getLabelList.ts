import { http, HttpResponse, RequestHandler } from 'msw';

import { LABEL } from '@/api/endpoint.ts';
import { LabelListResponse } from '@/api/label/getLabelList.ts';

const response: BaseResponse<LabelListResponse> = {
  message: '라벨+그룹 조회 성공',
  body: {
    label_count: 2,
    labels: [
      {
        id: 1,
        category: 'MEMBER',
        title: '알고리즘 스터디',
        color: 'charcoal',
      },
      {
        id: 2,
        category: 'GROUP',
        title: 'work group',
        color: 'blue',
      },
      {
        id: 3,
        category: 'MEMBER',
        title: '공부 스터디',
        color: 'brown',
      },
    ],
  },
};

const getLabelList: RequestHandler = http.get(
  `http://localhost:8080${LABEL.V1.LABELS.MAIN}`,
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getLabelList;
