import { axiosWithAccessToken } from '@/api/axios';
import { LABEL } from '@/api/endpoint.ts';

/* Response */
export type LabelListResponse = {
  labels: LabelFilterData[];
};

/* API */
export const getLabelList = async () => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<LabelListResponse>
  >(LABEL.V1.LABELS.MAIN);

  return data;
};
