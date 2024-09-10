import Text from '@/components/common/Text';
import { TextContent } from '@/objects/Content';

type TTextProps = {
  thumbnailContent: TextContent;
};

function TText({ thumbnailContent }: TTextProps) {
  const text =
    thumbnailContent.text.length > 100
      ? thumbnailContent.text.slice(0, 100) + '...'
      : thumbnailContent.text;
  return (
    <div>
      <Text content={text} />
    </div>
  );
}

export default TText;
