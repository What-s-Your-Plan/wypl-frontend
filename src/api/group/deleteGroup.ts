import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';

/* Request */
export type DeleteGroupParams = {
  groupId: number;
};

/* API */
export const deleteGroup = async ({ groupId }: DeleteGroupParams) => {
  await axiosWithAccessToken.delete(
    GROUP.V1.GROUPS.GROUP_ID.replace(':groupId', groupId.toString()),
  );
};
