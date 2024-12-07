import { PrevWhiteContainer } from '@/components/Common/PrevContainer';
import Text from '@/components/Common/Text/Text';
import { TextContent } from '@/objects/ReviewContent.ts';

type VTextProps = {
  content: TextContent;
};

function VText({ content }: VTextProps) {
  return (
    <PrevWhiteContainer $width="900">
      <Text content={content.text} />
    </PrevWhiteContainer>
  );
}

export default VText;
