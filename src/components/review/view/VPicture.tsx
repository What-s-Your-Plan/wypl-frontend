import { PrevWhiteContainer } from '@/components/Common/PrevContainer';
import { PictureContent } from '@/objects/ReviewContent.ts';

type VPictureProps = {
  content: PictureContent;
};

function VPicture({ content }: VPictureProps) {
  return (
    <PrevWhiteContainer $width="900" className="flex justify-center">
      <img src={content.path} alt="사진" />
    </PrevWhiteContainer>
  );
}

export default VPicture;
