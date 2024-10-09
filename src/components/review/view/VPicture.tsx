import { WhiteContainer } from '@/components/Common/Container';
import { PictureContent } from '@/objects/ReviewContent.ts';

type VPictureProps = {
  content: PictureContent;
};

function VPicture({ content }: VPictureProps) {
  return (
    <WhiteContainer $width="900" className="flex justify-center">
      <img src={content.path} alt="사진" />
    </WhiteContainer>
  );
}

export default VPicture;
