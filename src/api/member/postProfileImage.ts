import { axiosWithMultiPart } from '@/api/axios';
import { MEMBER } from '@/api/endpoint.ts';

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
  >(MEMBER.V1.MEMBERS.PROFILE_IMAGE, formData);

  return data;
};
