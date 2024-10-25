import { axiosWithAccessToken } from '../axios';

import { LABEL } from '@/api/endpoint.ts';
import { LabelColorType } from '@/styles/Theme';

/* Request */
export type LabelCreateRequest = {
  color: LabelColorType;
  title: string;
};

/* API */
export const postCreateLabel = async ({ color, title }: LabelCreateRequest) => {
  const { data } = await axiosWithAccessToken.post<BaseResponse<void>>(
    LABEL.V1.LABELS.BASE,
    {
      color,
      title,
    },
  );

  return data;
};

export default postCreateLabel;
