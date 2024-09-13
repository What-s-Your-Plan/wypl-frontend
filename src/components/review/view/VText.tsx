import { WhiteContainer } from '@/components/common/Container';
import Text            from '@/components/common/Text';
import { TextContent } from '@/objects/ReviewContent.ts';

type VTextProps = {
  content: TextContent;
};

function VText({ content }: VTextProps) {
  return (
    <WhiteContainer $width="900">
      <Text content={content.text} />
    </WhiteContainer>
  );
}

export default VText;
