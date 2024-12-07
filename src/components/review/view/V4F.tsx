import { PrevWhiteContainer } from '@/components/Common/PrevContainer';
import Divider from '@/components/Common/Divider/Divider';
import Text from '@/components/Common/Text/Text';
import { FourFContent } from '@/objects/ReviewContent.ts';

type V4FProps = {
  content: FourFContent;
};

function V4F({ content }: V4FProps) {
  return (
    <PrevWhiteContainer $width="900" className="flex justify-around gap-4">
      <div className="w-500 flex flex-col gap-4 justify-between">
        <div>
          <div className="font-semibold">사실(Facts)</div>
          <div className="!min-h-24">
            <Text content={content.facts} />
          </div>
        </div>
        <Divider styles={{ $direction: 'horizontal' }} />
        <div>
          <div className="font-semibold">느낌(Feeling)</div>
          <div className="!min-h-24 !mb-2">
            <Text content={content.feeling} />
          </div>
        </div>
      </div>
      <Divider styles={{ $direction: 'vertical' }} />
      <div className="w-500 flex flex-col gap-4 justify-between">
        <div>
          <div className="font-semibold">교훈(Finding)</div>
          <div className="!min-h-24">
            <Text content={content.finding} />
          </div>
        </div>
        <Divider
          styles={{
            $direction: 'horizontal',
          }}
        />
        <div>
          <div className="font-semibold">향후 행동(Future action)</div>
          <div className="!min-h-24 !mb-2">
            <Text content={content.future} />
          </div>
        </div>
      </div>
    </PrevWhiteContainer>
  );
}

export default V4F;
