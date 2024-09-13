import { axiosWithMultiPart } from '../axios.ts';

import { FILE } from '@/api/endpoint.ts';

/* Response */
export type PostPictureResponse = {
  image_url: string;
};

/* API */
export const postPicture = async (formData: FormData) => {
  const { data } = await axiosWithMultiPart.post<
    BaseResponse<PostPictureResponse>
  >(FILE.V1.IMAGE, formData);

  return data;
};

export default postPicture;
