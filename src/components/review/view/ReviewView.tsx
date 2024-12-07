import { ReactNode } from 'react';

import { PrevWhiteContainer } from '@/components/Common/PrevContainer';

type ReviewBlockProps = {
  icon: string;
  blockType: string;
  title: string;
  content: ReactNode;
};

function ReviewView({ icon, blockType, title, content }: ReviewBlockProps) {
  return (
    <div
      draggable={true}
      onDragStart={(e: React.DragEvent) =>
        e.dataTransfer.setData('blockType', blockType)
      }
    >
      <PrevWhiteContainer $width="1300" className="flex flex-col">
        <div className="flex">
          <img src={icon} className="w-5 mr-2" />
          <span>{title}</span>
        </div>
        <div className="text-sm my-1">{content}</div>
      </PrevWhiteContainer>
    </div>
  );
}

export default ReviewView;
