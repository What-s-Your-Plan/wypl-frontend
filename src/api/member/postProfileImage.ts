import { axiosWithMultiPart } from '@/api/axios';
import { API_PATH } from '@/constants/Path';

/* Request */
export type UpdateProfileImageRequest = {
  formData: FormData;
};

/* Response */
export type UpdateProfileImageResponse = {
  profile_image_url: string;
};

/* API */
export const postProfileImage = async ({
  formData,
}: UpdateProfileImageRequest) => {
  const { data } = await axiosWithMultiPart.post<
    BaseResponse<UpdateProfileImageResponse>
  >(API_PATH.MEMBER.PROFILE_IMAGE, formData);

  return data;
};
