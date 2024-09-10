import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import getReviewDetail from '@/api/review/getReviewDetail';
import ViewBlockList from '@/components/review/view/ViewBlockList';
import WriteBlockList from '@/components/review/write/WriteBlockList';
import { Content }     from '@/objects/Content';
import useReviewStore  from '@/stores/ReviewStore';

function ReviewModifyPage() {
  const { scheduleId, reviewId } = useParams();
  const reviewStore = useReviewStore();

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (reviewId) {
        const response = await getReviewDetail(reviewId);
        const mappedResponse = {
          ...response,
          contents: response.contents.map((content: Content) => ({
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
