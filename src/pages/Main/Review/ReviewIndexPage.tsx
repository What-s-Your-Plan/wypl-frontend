import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReviewDetailData } from '@/@types/Review';
import getReviewList                 from '@/api/review/getReviewList';
import NoContentAnimation            from '@/components/Animation/NoContent';
import { Container, WhiteContainer } from '@/components/common/Container';
import { Divider } from '@/components/common/Divider';
import ReviewThumbnail from '@/components/review/thumbnail/ReviewThumbnail';
import { MAX_VALUE } from '@/constants/JavaNumber.ts';

function ReviewIndexPage() {
  const navigator = useNavigate();

  const [reviews, setReviews] = useState<ReviewDetailData[]>([]);
  const [reviewPagingCondition, setReviewPagingCondition] =
    useState<PagingCondition>({
      hasNext: true,
      sort: 'NEWEST',
      lastId: MAX_VALUE.INTEGER,
    });

  /**
   *  조회한 리뷰를 가지고 페이징 조건을 처리한다.
   *  TODO: 추후 해당 내용을 가지고 Paging 관련 Utils 로 분리할 수 있을 것 같습니다.
   *
   * @param reviewCount 조회한 리뷰의 개수
   * @param lastReviewId  조회한 리뷰의 마지막 식별자
   */
  const handlePagingCond = (reviewCount: number, lastReviewId: number) => {
    const newReviewPagingConditionLastId: number =
      reviewCount > 0 ? lastReviewId : reviewPagingCondition.lastId;
    const hasNextReviews: boolean = reviewCount < 24;
    setReviewPagingCondition({
      hasNext: hasNextReviews,
      lastId: newReviewPagingConditionLastId,
      sort: reviewPagingCondition.sort,
    });
  };

  const fetchReviewList = async () => {
    const { body } = await getReviewList(
      { viewType: reviewPagingCondition.sort },
      { lastReviewId: reviewPagingCondition.lastId },
    );

    setReviews([...reviews, ...body.reviews]);

    handlePagingCond(
      body.review_count,
      body.reviews[body.reviews.length - 1].review_id,
    );
  };

  useEffect(() => {
    fetchReviewList();
  }, []);

  const renderReviewIndex = () => {
    if (reviews.length === 0) {
      return (
        <div className="flex justify-center items-center text-center w-full h-full">
          <NoContentAnimation />
        </div>
      );
    }
    return reviews.map((review, index) => {
      return (
        <WhiteContainer
          key={index}
          className="h-full"
          $width="400"
          $height="twoThird"
          onClick={() => navigator(`/review/${review.review_id}`)}
        >
          <ReviewThumbnail
            blockType={review.thumbnail_content?.blockType}
            thumbnailContent={review.thumbnail_content}
          />
          <Divider />
          <div className="font-semibold mt-2">{review.title}</div>
        </WhiteContainer>
      );
    });
  };

  return (
    <div className="container flex items-center   justify-center ss:max-sm:block h-dvh">
      <Container $width="1200" className="h-[90%]">
        <div className="text-lg font-semibold">회고록</div>
        <div className="scrollBar flex gap-6 gap-x-10 flex-wrap justify-start content-start pl-10 px-4 mt-4 h-[95%]">
          {renderReviewIndex()}
          {reviewPagingCondition.hasNext && (
            <div className="flex justify-center text-center">
              <div className="cursor-pointer">더 보기</div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default ReviewIndexPage;
