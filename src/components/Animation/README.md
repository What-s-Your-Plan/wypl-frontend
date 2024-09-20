# Components - Animation

해당 패키지에서는 [lottie](https://lottiefiles.com/what-is-lottie)로 생성된 애니메이션 컴포넌트를 다룹니다.

아래는 사용하고 있는 구글 로딩 애니메이션 컴포넌트의 예시입니다.

```tsx
import Lottie from 'lottie-react';

import google from '@/assets/lottie/google.json';

const style = {
  width: '300px',
};

function GoogleLoadingAnimation() {
  return <Lottie animationData={google} style={style}> </Lottie>;
}

export default GoogleLoadingAnimation;
```

- `style` 코드는 따로 파일로 분리하지 않고 해당 파일에 같이 작성하도록 합니다.