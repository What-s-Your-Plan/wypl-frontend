# Components

해당 패키지는 컴포넌트를 모아둔 곳 입니다.
기본적으로 하나의 패키지 안에는 하나의 컴포넌트만 존재합니다.

```text

```

## 1. Naming

### 1.1. Package Naming

패키지의 이름은 영어 대문자로 시작합니다.

| ✅ Correct | ❌ Incorrect |
|:---------:|:-----------:|
| Calendar  |  calendar   |

### 1.2. File Naming

파일의 이름은 패키지의 이름과 동일하게 작성합니다.

|  ✅ Correct   | ❌ Incorrect |
|:------------:|:-----------:|
| Calendar.tsx |  Index.tsx  |

만약 CSS In JS 관련 파일이 있다면 파일의 이름 뒤에 `.styled`를 공통적으로 붙여서 관리합니다.

|     ✅ Correct      | ❌ Incorrect |
|:------------------:|:-----------:|
| Calendar.styled.ts | Calendar.ts |

## 2. Props

컴포넌트, `CSS In JS`에 `Props`가 있다면 `export interface`로 작성합니다.

**✅ Correct**

```tsx
export interface CalendarProps {
  /** 현재 선택된 달력의 종류 */
  category: 'MEMBER' | 'GROUP';
  /** 그룹 달력이면 현재 선택된 그룹의 식별자 */
  groupId?: number;
}

export interface DButtonProps {
  $isSelected: boolean;
  $isToday: boolean;
  $isCurrentMonth: boolean;
}
```

### CSS In JS

만약 `CSS In JS`에서 Props가 필요하다면 변수명 앞에 반드시 `$`를 붙여서 관리합니다.

**❌ Incorrect**

```tsx
export type CalendarProps = {
  /** 현재 선택된 달력의 종류 */
  category: 'MEMBER' | 'GROUP';
  /** 그룹 달력이면 현재 선택된 그룹의 식별자 */
  groupId?: number;
}


export type DButtonProps = {
  $isSelected: boolean;
  $isToday: boolean;
  $isCurrentMonth: boolean;
}
```

> 🔔 선택사항
>
> `Props`의 설명을 하기 위해 주석을 작성한다면 `//`가 아닌 `/** */`로 작성합니다.