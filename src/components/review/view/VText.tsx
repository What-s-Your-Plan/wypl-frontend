import { WhiteContainer } from '@/components/Common/Container';
import Text from '@/components/Common/Text/Text';
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
