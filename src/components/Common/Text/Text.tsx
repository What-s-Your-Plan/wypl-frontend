import { getTextSizeStyling } from './Text.styled';

export interface TextProps {
  content: string;
  $size?: 'small' | 'medium' | 'large';
}

function Text({ content, $size = 'medium' }: TextProps) {
  return (
    <div css={{ width: '100%' }}>
      {content.split('\n').map((line, index) => {
        return (
          <span key={index} css={[getTextSizeStyling($size)]}>
            {line}
            <br />
          </span>
        );
      })}
    </div>
  );
}

export default Text;
