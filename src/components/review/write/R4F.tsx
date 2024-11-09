import { WhiteContainer } from '@/components/Common/Container';
import Divider from '@/components/Common/Divider/Divider';
import { InputTextArea } from '@/components/Common/InputText';
import { FourFContent } from '@/objects/ReviewContent.ts';
import useReviewStore from '@/stores/ReviewStore';

type R4FProps = {
  index: number;
  content: FourFContent;
};

function R4F({ index, content }: R4FProps) {
  const { setContent } = useReviewStore();

  const handleFactsInput = (facts: string) => {
    const newContent = content;
    newContent.facts = facts;
    setContent(index, newContent);
  };

  const handleFeelingInput = (feeling: string) => {
    const newContent = content;
    newContent.feeling = feeling;
    setContent(index, newContent);
  };

  const handleFindingInput = (finding: string) => {
    const newContent = content;
    newContent.finding = finding;
    setContent(index, newContent);
  };

  const handleFutureInput = (future: string) => {
    const newContent = content;
    newContent.future = future;
    setContent(index, newContent);
  };

  return (
    <WhiteContainer $width="900" className="flex flex-row gap-5">
      <div className="flex flex-col w-500 gap-2">
        <div>
          <label htmlFor={`facts${index}`}>사실(Facts)</label>
          <InputTextArea
            className="scrollBar"
            $width="100%"
            id={`facts${index}`}
            rows={6}
            value={content.facts}
            onChange={(e) => handleFactsInput(e.target.value)}
            placeholder="일어난 일에 대한 객관적인 기록"
          />
        </div>
        <Divider styles={{ $direction: 'horizontal' }} />
        <div>
          <label htmlFor={`finding${index}`}>느낌(Feeling)</label>
          <InputTextArea
            className="scrollBar"
            $width="100%"
            id={`feeling${index}`}
            rows={6}
            value={content.feeling}
            onChange={(e) => handleFeelingInput(e.target.value)}
            placeholder="상황에 대한 감정적인 반응"
          />
        </div>
      </div>
      <Divider styles={{ $direction: 'vertical' }} />
      <div className="flex flex-col w-500 gap-2">
        <div>
          <label htmlFor={`finding${index}`}>교훈(Finding)</label>
          <InputTextArea
            className="scrollBar "
            $width="100%"
            id={`finding${index}`}
            rows={6}
            value={content.finding}
            onChange={(e) => handleFindingInput(e.target.value)}
            placeholder="경험을 통해 배울 수 있었던 것"
          />
        </div>
        <Divider styles={{ $direction: 'horizontal' }} />
        <div>
          <label htmlFor={`future${index}`}>향후 행동(Future action)</label>
          <InputTextArea
            className="scrollBar"
            $width="100%"
            id={`future${index}`}
            rows={6}
            value={content.future}
            onChange={(e) => handleFutureInput(e.target.value)}
            placeholder="향후 할 수 있는 개선된 행동"
          />
        </div>
      </div>
    </WhiteContainer>
  );
}

export default R4F;
