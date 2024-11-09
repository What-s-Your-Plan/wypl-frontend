import { ComponentPropsWithRef, ElementType } from 'react';

import Flex from '../Flex/Flex';

import type { DividerStyling } from './Divider.styled';

export interface DividerProps extends ComponentPropsWithRef<'div'> {
  /**
   *
   * @default 'div'
   */
  tag?: ElementType;

  /** Divider 스타일 옵션 */
  styles: DividerStyling;

  /** 출력을 원하는 텍스트 */
  text?: string;
}

function Divider({ tag = 'div', styles, text, ...attributes }: DividerProps) {
  const Tag = tag;

  return (
    <div css={{ position: 'relative' }}>
      <Flex
        styles={{
          position: 'absolute',
          align: 'center',
        }}
        css={{ inset: '0px' }}
        aria-hidden="true"
      >
        <Tag
          css={{
            width: styles.$direction === 'vertical' ? '1px' : '100%',
            height: styles.$direction === 'vertical' ? '100%' : '1px',
            backgroundColor: '#d1d5db',
          }}
          {...attributes}
        />
        {text && (
          <Flex
            styles={{
              position: 'relative',
              justify: 'center',
            }}
            css={{ width: '100%' }}
          >
            <span
              css={{
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                fontSize: '0.875rem',
                color: '#6b7280',
              }}
            >
              {text}
            </span>
          </Flex>
        )}
      </Flex>
    </div>
  );
}

export default Divider;
