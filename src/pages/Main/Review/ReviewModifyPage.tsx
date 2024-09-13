import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ReviewType } from '@/@types/Review';
import { getReviewDetail } from '@/api/review/getReviewDetail';
import ViewBlockList from '@/components/review/view/ViewBlockList';
import WriteBlockList from '@/components/review/write/WriteBlockList';
import { ReviewContent } from '@/objects/ReviewContent.ts';
import useReviewStore from '@/stores/ReviewStore';

function ReviewModifyPage() {
  const { scheduleId, reviewId } = useParams();
  const reviewStore = useReviewStore();

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
        reviewStore.setTitle(mappedResponse.title);
        reviewStore.setContents(mappedResponse.contents);
      }
    };
    if (scheduleId) reviewStore.setScheduleId(Number(scheduleId));
    if (reviewId) {
      fetchReviewDetail();
    }
  }, []);
  return (
    <>
      <div className="container flex items-center ss:max-sm:block h-dvh">
        <ViewBlockList />
        <WriteBlockList />
      </div>
    </>
  );
}

export default ReviewModifyPage;
