import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ReviewType } from '@/@types/Review';
import { ReviewResponse } from '@/@types/ReviewResponse';
import { deleteReview } from '@/api/review/deleteReview';
import { getReviewDetail } from '@/api/review/getReviewDetail';
import ArrowLeft from '@/assets/icons/arrowLeft.svg';
import MoreVertical from '@/assets/icons/moreVertical.svg';
import Button from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import PopOver from '@/components/common/PopOver';
import DetailBlockList from '@/components/review/view/DetailBlockList';
import { ReviewContent } from '@/objects/ReviewContent.ts';
import { splitTTime } from '@/utils/DateUtils';

function ReviewDetailPage() {
  const navigator = useNavigate();
  const { reviewId } = useParams();
  const [detail, setDetail] = useState<ReviewResponse>();

  if (typeof reviewId !== 'string') {
    navigator('/notfound');
  }

  const handleModify = () => {
    navigator(`/review/modify/${detail?.schedule.schedule_id}/${reviewId}`);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 회고록을 삭제하시겠습니까?')) {
      try {
        await deleteReview({ review_id: reviewId as string });
        alert('리뷰가 삭제되었습니다.'); // 성공적으로 삭제되었음을 사용자에게 알림
        navigator('/review'); // 삭제 후 리뷰 목록 페이지로 리다이렉트
      } catch (error) {
        alert('리뷰 삭제에 실패했습니다.'); // 에러 처리
      }
    }
  };

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (reviewId) {
        const response = await getReviewDetail({ reviewId });
        const mappedResponse = {
          ...response,
          contents: response.contents.map((content: ReviewContent) => ({
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
        <Container $width="1200" className="h-[90vh]">
          <div className="flex justify-between">
            <span>
              <Button
                $size="none"
                className="!bg-transparent"
                onClick={() => navigator(`/review`)}
              >
                <img src={ArrowLeft} alt="뒤로가기" />
              </Button>
            </span>
            <div className="flex gap-2">
              <span className="text-sm">{splitTTime(detail.created_at)}</span>
              <span className="relative">
                <PopOver
                  button={
                    <div>
                      <Button $size="none" className="!bg-transparent">
                        <img src={MoreVertical} alt="더보기" />
                      </Button>
                    </div>
                  }
                  panel={
                    <div className="flex flex-col gap-0.5 w-16 px-3 py-2 bg-default-white/95 rounded-lg shadow-lg">
                      <div onClick={handleModify} className="cursor-pointer">
                        수정
                      </div>
                      <div
                        onClick={handleDelete}
                        className="text-label-red cursor-pointer"
                      >
                        삭제
                      </div>
                    </div>
                  }
                  panelPosition="right-0 top-7"
                />
              </span>
            </div>
          </div>
          {reviewId && <DetailBlockList detail={detail} />}
        </Container>
      )}
    </div>
  );
}

export default ReviewDetailPage;
