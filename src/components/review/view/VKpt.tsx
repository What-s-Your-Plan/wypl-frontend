import { PrevWhiteContainer } from '@/components/Common/PrevContainer';
import Divider from '@/components/Common/Divider/Divider';
import Text from '@/components/Common/Text/Text';
import { KPTContent } from '@/objects/ReviewContent.ts';

type VKptProps = {
  content: KPTContent;
};

function V4F({ content }: VKptProps) {
  return (
    <PrevWhiteContainer $width="900" className="flex justify-between gap-4">
      <div className="w-500 flex flex-col gap-4 justify-between">
        <div>
          <div className="font-semibold">Keep</div>
          <div className="!min-h-24">
            <Text content={content.keepStr} />
          </div>
        </div>
        <Divider styles={{ $direction: 'horizontal' }} />
        <div>
          <div className="font-semibold">Problem</div>
          <div className="!min-h-24 !mb-2">
            <Text content={content.problemStr} />
          </div>
        </div>
      </div>
      <Divider styles={{ $direction: 'vertical' }} />
      <div className="w-500">
        <div className="font-semibold">Try</div>
        <div className="!min-h-[236px] !mb-2">
          <Text content={content.tryStr} />
        </div>
      </div>
    </PrevWhiteContainer>
  );
}

export default V4F;
