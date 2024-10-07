import { useNavigate } from 'react-router-dom';

import {
  deleteGroupInvite,
  DeleteGroupInviteParams,
} from '@/api/group/deleteGroupInvite';
import patchGroupInviteAccepted from '@/api/group/patchGroupInviteAccepted';
import Check from '@/assets/icons/check.svg';
import X                from '@/assets/icons/x.svg';
import Button           from '@/components/Common/Button';
import { BROWSER_PATH } from '@/constants/Path';

type GroupNotificationProps = {
  notification: WYPLNotificationData;
};

function GroupNotification({ notification }: GroupNotificationProps) {
  const navigate = useNavigate();
  const groupId: number = notification.target_id;

  const handleReject = async () => {
    const deleteGroupInviteParam: DeleteGroupInviteParams = {
      groupId: groupId,
    };
    await deleteGroupInvite(deleteGroupInviteParam);
  };

  const handleAccept = async () => {
    await patchGroupInviteAccepted({ groupId });
    await window.location.reload;
    navigate(`${BROWSER_PATH.GROUP.BASE}/${groupId}`);
  };

  return (
    <div className="container w-full flex flex-col gap-2 pt-2">
      <div>{notification.message}</div>
      <div className="w-full flex justify-center gap-4">
        <Button
          $size="lg"
          $width="30%"
          className="!bg-zinc-500"
          onClick={handleReject}
        >
          <img src={X} alt="X" className="whiteImg w-5 mr-2" />
          <span className="text-default-white font-semibold">거부</span>
        </Button>
        <Button
          $size="lg"
          $width="30%"
          $bgColor="labelGreen"
          onClick={handleAccept}
        >
          <img src={Check} alt="Check" className="whiteImg w-5 mr-2" />
          <span className="text-default-white font-semibold">수락</span>
        </Button>
      </div>
    </div>
  );
}

export default GroupNotification;
