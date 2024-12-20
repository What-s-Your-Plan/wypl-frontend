import Text from '@/components/Common/Text/Text';
import { KPTContent } from '@/objects/ReviewContent.ts';

type TKptProps = {
  thumbnailContent: KPTContent;
};

function TKpt({ thumbnailContent }: TKptProps) {
  const keep =
    thumbnailContent.keepStr.length > 100
      ? thumbnailContent.keepStr.slice(0, 100) + '...'
      : thumbnailContent.keepStr;
  return (
    <div>
      <Text content={keep} />
    </div>
  );
}

export default TKpt;
