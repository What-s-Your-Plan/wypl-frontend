import { axiosWithAccessToken } from '../axios';

import { LABEL }           from '@/api/endpoint.ts';
import { LabelColorsType } from '@/styles/colorThemes.ts';

/* Request */
export type LabelCreateRequest = {
  color: LabelColorsType;
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
