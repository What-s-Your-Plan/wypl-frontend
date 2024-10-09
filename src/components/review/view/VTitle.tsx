import { WhiteContainer } from '@/components/Common/Container';

type VTitleProps = {
  title: string;
};

function VTitle({ title }: VTitleProps) {
  return (
    <WhiteContainer $width="900">
      <span className="font-bold">{title}</span>
    </WhiteContainer>
  );
}

export default VTitle;
