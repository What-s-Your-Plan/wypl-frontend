import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ReviewType } from '@/@types/Review';
import { ReviewDetailData } from '@/@types/ReviewResponse';
import { deleteReview } from '@/api/review/deleteReview';
import { getReviewDetail } from '@/api/review/getReviewDetail';
import ArrowLeft from '@/assets/icons/arrowLeft.svg';
import MoreVertical from '@/assets/icons/moreVertical.svg';
import Button from '@/components/Common/Button/Button.tsx';
import { PrevContainer } from '@/components/Common/PrevContainer';
import PopOver from '@/components/Common/PopOver';
import DetailBlockList from '@/components/review/view/DetailBlockList';
import { ReviewContent } from '@/objects/ReviewContent.ts';
import { splitTTime } from '@/utils/DateUtils';

function ReviewDetailPage() {
  const navigator = useNavigate();
  const { reviewId } = useParams();
  const [detail, setDetail] = useState<ReviewDetailData>();

  if (typeof reviewId !== 'string') {
    navigator('/notfound');
  }

  const handleModify = () => {
    navigator(`/review/modify/${detail?.schedule.schedule_id}/${reviewId}`);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 회고록을 삭제하시겠습니까?')) {
      await deleteReview({ review_id: reviewId as string });
      navigator('/review'); // 삭제 후 리뷰 목록 페이지로 리다이렉트
    }
  };

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (reviewId) {
        const { body } = await getReviewDetail({ reviewId });
        const mappedResponse = {
          ...body,
          contents: body.contents.map((content: ReviewContent) => ({
            ...content,
            blockType: content.blockType as ReviewType,
          })),
        };
        setDetail(mappedResponse);
      }
    };
    fetchReviewDetail();
  }, []);

  return (
    <div className="container flex items-center   justify-center ss:max-sm:block h-dvh ">
      {detail && (
        <PrevContainer $width="1200" className="h-[90vh]">
          <div className="flex justify-between">
            <span>
              <Button
                styles={{ $size: 'small', $variant: 'outline' }}
                onClick={() => navigator(`/review`)}
                children={<img src={ArrowLeft} alt="뒤로가기" />}
              />
            </span>
            <div className="flex gap-2">
              <span className="text-sm">{splitTTime(detail.created_at)}</span>
              <span className="relative">
                <PopOver
                  button={
                    <div>
                      <Button
                        styles={{ $size: 'small', $variant: 'default' }}
                        children={<img src={MoreVertical} alt="더보기" />}
                      />
                    </div>
                  }
                  panel={
                    <div className="flex flex-col gap-0.5 w-20 px-3 py-2 bg-default-white/95 rounded-lg shadow-lg">
                      <Button
                        styles={{ $size: 'small', $variant: 'default' }}
                        onClick={handleModify}
                        children={<p>수정</p>}
                      />
                      <Button
                        styles={{ $size: 'small', $variant: 'danger' }}
                        onClick={handleDelete}
                        children={<p>삭제</p>}
                      />
                    </div>
                  }
                  panelPosition="right-0 top-7"
                />
              </span>
            </div>
          </div>
          {reviewId && <DetailBlockList detail={detail} />}
        </PrevContainer>
      )}
    </div>
  );
}

export default ReviewDetailPage;
