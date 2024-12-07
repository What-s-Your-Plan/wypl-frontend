import { PrevWhiteContainer } from '@/components/Common/PrevContainer';

type VTitleProps = {
  title: string;
};

function VTitle({ title }: VTitleProps) {
  return (
    <PrevWhiteContainer $width="900">
      <span className="font-bold">{title}</span>
    </PrevWhiteContainer>
  );
}

export default VTitle;
