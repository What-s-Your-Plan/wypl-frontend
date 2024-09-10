# Api

해당 패키지에서는 서버와 통신하기 위한 API를 위한 코드를 작성합니다.

## 패키지 컨벤션

패키지의 경로는 API의 URL에 맞도록 작성합니다.

경로는 `/auth/v1/logout`이고 `delete`요청인 경우에는 다음과 같은 파일구조에다가 생성합니다.

`auth/v1/logout/deleteJsonWebTokens.ts`와 같이 파일을 작성하여 코드를 작성합니다.

## API Request, Response

API의 Request와 Response와 같이 필요한 타입의 경우에는 하나의 파일에 같이 작성합니다.

아래는 예제 코드입니다.

```ts
/* Request */
export type CalendarPathVariable = {
  type: CalenderType;
};

export type CalendarParams = {
  date: string;
};

/* Response */
export type CalendarsResponse = {
  schedule_count: number;
  schedules: Array<CalendarScheduleData>;
};

/* API */
export const getCalendars = async (
  { type }: CalendarPathVariable,
  params: CalendarParams,
) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<CalendarsResponse>
  >(`${CALENDAR.V1.CALENDARS.BASE}/${type}`, { params });

  return data;
};
```

- `export type`을 사용하여 타입 작성합니다.
- `export const`를 사용하여 `function`을 작성합니다.
- 반환 값은 `data` 를 구조 분해 할당으로 가져와 반환합니다.
- Request, Response, API와 같이 3개의 구조로 작성합니다.