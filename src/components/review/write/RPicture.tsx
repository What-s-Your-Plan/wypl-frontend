import React, { useState } from 'react';

import postPicture from '@/api/file/postPicture.ts';
import Upload                 from '@/assets/icons/upload.svg';
import CircleLoadingAnimation from '@/components/Animation/CircleLoading';
import { WhiteContainer }     from '@/components/common/Container';
import { PictureContent } from '@/objects/ReviewContent.ts';
import useReviewStore from '@/stores/ReviewStore';

type RPictureProps = {
  index: number;
  content: PictureContent;
};

function RPicture({ index, content }: RPictureProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setContent } = useReviewStore();

  //TODO: 이미지 업로드 시 파일 validation 체크 필요
  const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      const { body } = await postPicture(formData).finally(() =>
        setIsLoading(false),
      );

      const newContent = content;
      newContent.path = body.image_url;
      setContent(index, newContent);
    }
  };

  return (
    <WhiteContainer $width="900" className="flex justify-center !py-8">
      {isLoading && <CircleLoadingAnimation />}
      <label htmlFor={`file${index}`}>
        <img
          src={content.path === '' ? Upload : content.path}
          className="object-fill h-40"
          alt=""
        />
        <input
          type="file"
          id={`file${index}`}
          name={`file${index}`}
          accept="image/png, image/jpg, image/jpeg"
          multiple={false}
          onChange={handleImgChange}
          className="hidden"
        />
      </label>
    </WhiteContainer>
  );
}

export default RPicture;
