import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ReviewWrite from './ReviewWrite';
import RSchedule from './RSchedule';
import RTitle from './RTitle';

import { ReviewType } from '@/@types/Review';
import { postReview } from '@/api/review/postReview';
import Save from '@/assets/icons/save.svg';
import Cancel from '@/assets/icons/x.svg';
import Button from '@/components/Common/Button/Button.tsx';
import * as S from '@/components/Common/Container';
import { Divider, DividerLabel } from '@/components/Common/Divider';
import useReviewStore from '@/stores/ReviewStore';
import useToastStore from '@/stores/ToastStore';

function WriteBlockList() {
  const { addToast } = useToastStore();
  const reviewStore = useReviewStore();
  const navigator = useNavigate();

  const renderBlockList = () => {
    const blockList = reviewStore.contents;
    return blockList.map((block, index) => {
      return <ReviewWrite key={index} index={index} content={block} />;
    });
  };

  const handleDropItem = (event: React.DragEvent) => {
    event.preventDefault();
    if (reviewStore.contents.length > 100) {
      alert('회고 블록은 100개까지 추가할 수 있습니다!');
      return;
    }
    const dragItem = event.dataTransfer.getData('blockType');
    if (dragItem) {
      reviewStore.addContent(
        reviewStore.contents.length - 1,
        dragItem as ReviewType,
      );
    }
  };

  const handleCancelClick = () => {
    reviewStore.resetReview();
    navigator(-1);
  };

  const handleSaveClick = async () => {
    const request = {
      title: reviewStore.title,
      schedule_id: reviewStore.scheduleId,
      contents: reviewStore.contents,
    };
    if (request.title === '') {
      addToast({
        duration: 300,
        message: '회고 제목은 필수입니다.',
        type: 'ERROR',
      });
      return;
    }
    if (request.contents.length === 0) {
      addToast({
        duration: 300,
        message: '회고 내용은 필수입니다.',
        type: 'ERROR',
      });
      return;
    } else {
      for (let i = 0; i < request.contents.length; i++) {
        if (!reviewStore.isContentComplete(i)) {
          addToast({
            duration: 300,
            message: `${i + 1}번째 블록이 비어있습니다.`,
            type: 'ERROR',
          });
          reviewStore.setFocusIndex(i);
          return;
        }
      }
    }
    const { body } = await postReview(request);
    if (body.review_id) {
      reviewStore.resetReview();
      navigator(`/review/${body.review_id}`);
    }
  };

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', preventClose);
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  return (
    <S.Container $width="right" className="scrollBar flex flex-col gap-4">
      <div>
        <span className="float-end flex gap-2">
          <Button
            styles={{
              $size: 'large',
              $variant: 'danger',
            }}
            onClick={handleCancelClick}
            children={
              <>
                <img src={Cancel} alt="취소" className="w-5 mr-2 whiteImg" />
                취소
              </>
            }
          />
          <Button
            styles={{ $size: 'large', $variant: 'primary' }}
            onClick={handleSaveClick}
            children={
              <>
                <img src={Save} alt="저장" className="w-5 mr-2" />
                저장
              </>
            }
          />
        </span>
        <div>
          <RTitle $title={reviewStore.title} $setTitle={reviewStore.setTitle} />
          <RSchedule scheduleId={reviewStore.scheduleId} />
        </div>
      </div>
      <Divider />;
      <div
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={handleDropItem}
        className="h-[50vh]"
      >
        {reviewStore.contents.length === 0 ? (
          <S.WhiteContainer $width="900">
            <DividerLabel>
              좌측 블록 드래그&드랍으로 블록을 추가해주세요
            </DividerLabel>
          </S.WhiteContainer>
        ) : (
          renderBlockList()
        )}
      </div>
      ;
    </S.Container>
  );
}

export default WriteBlockList;
