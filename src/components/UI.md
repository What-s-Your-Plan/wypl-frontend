React에서 자주 사용하는 레이아웃 용어

1. Container

   • 설명: 페이지나 특정 섹션을 감싸는 역할을 하며, 전체 레이아웃을 중앙에 배치하거나 정렬을 쉽게 할 수 있도록 도와줍니다.
   • 주요 특징:
   • 페이지의 콘텐츠를 감싸는 가장 큰 틀.
   • max-width와 margin 속성을 자주 사용하여 중앙 정렬과 같은 레이아웃 스타일을 적용.
   • 예: 부트스트랩의 .container 클래스

```tsx
<div className="container">
  <h1>Hello, World!</h1>
</div>
```

2. Wrapper

   • 설명: 컨테이너와 유사하지만, 보통 하위 컴포넌트를 감싸기 위한 요소로 사용되며, 특정 레이아웃 스타일이나 간격을 제공하는 역할을 합니다.
   • 주요 특징:
   • 컴포넌트의 그룹을 감싸고 간격(padding, margin)을 적용하거나 레이아웃을 통제하는 데 사용.

```tsx
<div className="wrapper">
  <Card />
  <Card />
</div>
```

3. Flex (Flexbox)

   • 설명: CSS flexbox 레이아웃 시스템을 사용하여 유연한 레이아웃을 제공하며, 요소들을 수평/수직으로 정렬하고 공간을 배분할 수 있습니다.
   • 주요 특징:
   • 수직 및 수평 정렬이 용이.
   • 공간 분배: flex-grow, flex-shrink, flex-basis 속성 사용.
   • display: flex, justify-content, align-items, flex-direction 등의 옵션 제공.

```tsx
<div className="flex-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div>Box 1</div>
  <div>Box 2</div>
</div>
```

4. Grid (CSS Grid)

   • 설명: grid는 2차원 레이아웃을 제공하며, 행과 열을 기준으로 요소를 배치하는 데 사용됩니다.
   • 주요 특징:
   • 행과 열을 쉽게 정의 가능.
   • grid-template-columns, grid-template-rows 속성으로 명확한 레이아웃 정의.
   • gap, row-gap, column-gap 속성으로 간격 조정 가능.

```tsx
<div className="grid-container" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

5. Box

   • 설명: box는 UI 컴포넌트를 감싸는 기본적인 박스 모델을 의미하며, 패딩, 마진, 보더, 배경색 등을 설정할 수 있습니다.
   • 주요 특징:
   • padding, margin, border, background-color 등으로 스타일링 가능.
   • 고정된 크기 또는 유동적인 레이아웃 설정.

```tsx
<div className="box" style={{ padding: '16px', border: '1px solid black' }}>
  Box Content
</div>
```

추천하는 추가 레이아웃 패턴

1. Stack (Vertical/Horizontal Stack)

   • 설명: 여러 요소들을 수직 또는 수평으로 쌓아 배치하는 패턴입니다.
   • 주요 특징:
   • 수직(stack) 또는 수평(hstack)으로 컴포넌트들을 배치.
   • gap 속성으로 간격 조정 가능.

```tsx
<div className="vstack" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</div>
```

2. Container Query

   • 설명: 부모 컨테이너의 크기에 따라 스타일을 조정하는 패턴입니다.
   • 주요 특징: 미디어 쿼리 대신 컴포넌트 크기를 기준으로 반응형 레이아웃을 적용할 수 있습니다.

3. Responsive Layout

   • 설명: 브라우저 크기나 장치에 따라 레이아웃을 동적으로 변경하는 패턴입니다.
   • 주요 특징: @media 쿼리로 화면 크기와 해상도에 맞춘 반응형 디자인 적용.

```tsx
<div className="responsive-container" style={{ width: '100%', padding: '16px' }}>
  <p>Resize the window to see changes</p>
</div>
```

이렇게 작성된 마크다운 파일은 React 레이아웃에 대한 중요한 개념들을 정리한 가이드로 사용할 수 있습니다.