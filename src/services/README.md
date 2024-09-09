# Services

해당 패키지에서는 서버와 통신하기 위한 API를 위한 코드를 작성합니다.

## 패키지 컨벤션

패키지의 경로는 API의 URL에 맞도록 작성합니다.

경로는 `/auth/v1/logout`이고 `delete`요청인 경우에는 다음과 같은 파일구조에다가 생성합니다.

`auth/v1/logout/delete.ts`와 같이 파일을 작성하여 코드를 작성합니다.

## API Request, Response

API의 Request와 Response와 같이 필요한 타입의 경우에는 하나의 파일에 같이 작성합니다.

아래는 예제 코드입니다.

```ts
import { axiosWithAccessToken } from '../axios';

export type FindMemberByEmailResponse = {
  members: FindMemberProfile[];
  member_count: number;
};

export type FindMemberProfile = {
  id: number;
  email: string;
  nickname: string;
  profile_image_url: string | null;
};

async function getMemberByEmail(email: string, size: number) {
  // ETC...
}

export default getMemberByEmail;
```

`export type`을 사용하여 타입 작성합니다.