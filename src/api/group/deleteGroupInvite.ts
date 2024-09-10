import { axiosWithAccessToken } from '../axios';

import { GROUP } from '@/api/endpoint.ts';
import { DeleteGroupParams } from '@/api/group/deleteGroup.ts';

/* Request */
export type DeleteGroupInviteParams = DeleteGroupParams;

/* API */
export const deleteGroupInvite = async ({
  groupId,
}: DeleteGroupInviteParams) => {
  await axiosWithAccessToken.delete(
    GROUP.V1.GROUPS.MEMBER.INVITE.replace(':groupId', groupId.toString()),
  );
};
