import React from 'react';

import * as S from './Layout.styled';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <S.Container>
      <S.Content>{children}</S.Content>
    </S.Container>
  );
}

export default Layout;
