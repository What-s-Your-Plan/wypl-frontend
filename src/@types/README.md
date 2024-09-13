# @types

해당 패키지에서는 프로젝트에서 사용하는 타입을 작성합니다.

여기에 작성되는 타입은 두 가지 종류입니다.

## Data

컴포넌트에서 값을 출력하기 위한 데이터인 경우이면서, 여러 파일에 사용되면 해당 파일에 `interface`를 사용하여 작성합니다.

```ts
interface MemberProfileData {
  id: number;
  email: string;
  nickname: string;
  profile_image_url: string | null;
  main_color: string;
}
```

## Type

타입이 필요하다면 `type`을 사용하여 작성합니다.

```ts
type ReviewType = 'text' | 'picture' | 'emotion' | 'weather' | 'kpt' | '4f';
```

