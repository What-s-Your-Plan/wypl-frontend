import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Disclosure } from '@headlessui/react';

import GroupCreateModal from './create/GroupCreateModal';
import InvitedGroupInfo from './invited/InvitedGroupInfo';
import GroupDetailList from './list/GroupDetailList';

import {
  GroupInfoData,
  GroupSummaryData,
  GroupUpdateInfo,
} from '@/@types/Group';
import {
  getMemberGroupList,
  MemberGroupsResponse as MemberGroups,
} from '@/api/group/getMemberGroupList';
import ChevronDown from '@/assets/icons/chevronDown.svg';
import Envelope from '@/assets/icons/envelope.svg';
import Plus from '@/assets/icons/plus.svg';
import Users from '@/assets/icons/users.svg';
import Button from '@/components/Common/Button/Button.tsx';
import { Container } from '@/components/Common/Container';
import { Divider } from '@/components/Common/Divider';
import Tooltip from '@/components/Tooltip/Tooltip';
import { BROWSER_PATH } from '@/constants/Path';
import { LabelColorsType } from '@/styles/colorThemes.ts';

function GroupList() {
  const navigate = useNavigate();
  const [memberGroups, setMemberGroups] = useState<MemberGroups>({
    group_count: 0,
    groups: [],
    invited_group_count: 0,
    invited_groups: [],
  });

  const fetchMemberGroups = async () => {
    const { body } = await getMemberGroupList();
    setMemberGroups(body);
    if (body.group_count > 0) {
      navigate(BROWSER_PATH.GROUP.BASE + '/' + body.groups[0].id);
    } else {
      navigate(BROWSER_PATH.GROUP.BASE);
    }
  };

  const handleCreateGroup = (newGroup: GroupSummaryData) => {
    setMemberGroups((prev: MemberGroups) => {
      const updatedGroups: GroupSummaryData[] = [newGroup, ...prev.groups];
      return {
        ...prev,
        groups: updatedGroups,
        group_count: updatedGroups.length,
      };
    });
  };

  const handleMoveAcceptedGroupById = (acceptedGroupId: number) => {
    setMemberGroups((prev: MemberGroups) => {
      const acceptedGroup: GroupSummaryData | undefined =
        prev.invited_groups.find(
          (group: GroupSummaryData) => group.id === acceptedGroupId,
        );
      if (acceptedGroup === undefined) {
        return prev;
      }

      const updatedInvitedGroups = prev.invited_groups.filter(
        (group: GroupSummaryData) => group.id !== acceptedGroupId,
      );

      const updatedGroups: GroupSummaryData[] = [...prev.groups, acceptedGroup];

      return {
        groups: updatedGroups,
        group_count: updatedGroups.length,
        invited_groups: updatedInvitedGroups,
        invited_group_count: updatedInvitedGroups.length,
      };
    });
  };

  const handleRefuseGroupById = (refuseGroupId: number) => {
    setMemberGroups((prev: MemberGroups) => {
      const updatedInvitedGroups = prev.invited_groups.filter(
        (group: GroupSummaryData) => group.id !== refuseGroupId,
      );

      return {
        ...prev,
        invited_groups: updatedInvitedGroups,
        invited_group_count: updatedInvitedGroups.length,
      };
    });
  };

  /**
   * 그룹에서 삭제 및 탈퇴할때 그룹의 리스트에서 제거하는 핸들러
   *
   * @param deleteGroupId 삭제 및 탈퇴하는 그룹의 식별자
   */
  const handleDeleteGroupById = (deleteGroupId: number) => {
    setMemberGroups((prev: MemberGroups) => {
      const updateGroups = prev.groups.filter(
        (group: GroupSummaryData) => group.id !== deleteGroupId,
      );

      return {
        ...prev,
        group_count: updateGroups.length,
        groups: updateGroups,
      };
    });
  };

  const handleUpdateGroupById = (updateGroup: GroupUpdateInfo) => {
    setMemberGroups((prev: MemberGroups) => {
      const updateGroups = prev.groups.map((group: GroupSummaryData) => {
        if (group.id === updateGroup.id) {
          const newMemberGroup: GroupSummaryData = {
            ...group,
            name: updateGroup.name,
            color: updateGroup.color as LabelColorsType,
          };
          return newMemberGroup;
        }
        return group;
      });
      return {
        ...prev,
        groups: updateGroups,
      };
    });
  };

  const [groupCreateInit] = useState<GroupInfoData>({
    name: '',
    color: 'labelBrown',
    member_id_list: [],
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {}, [isModalOpen]);

  const renderInvitedGroupList = () => {
    if (memberGroups.invited_group_count === 0) {
      return <div>새로운 초대가 없어요</div>;
    }
    return memberGroups.invited_groups.map((group: GroupSummaryData) => {
      return (
        <InvitedGroupInfo
          key={group.id}
          group={group}
          acceptedEvent={handleMoveAcceptedGroupById}
          refusedEvent={handleRefuseGroupById}
        />
      );
    });
  };

  const renderGroupList = () => {
    if (memberGroups.group_count === 0) {
      return <div>속해있는 그룹이 없어요</div>;
    }
    return memberGroups.groups.map((group: GroupSummaryData) => {
      return (
        <GroupDetailList
          key={group.id}
          group={group}
          groupDeleteEvent={handleDeleteGroupById}
          groupUpdateEvent={handleUpdateGroupById}
        />
      );
    });
  };

  useEffect(() => {
    fetchMemberGroups();
  }, []);

  return (
    <>
      <Container $width="left" className="scrollBar flex flex-col gap-4">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex justify-between items-center cursor-default">
                <div className="flex gap-2 cursor-pointer">
                  <img src={Envelope} alt="초대" className="w-4" />
                  <span>초대받은 그룹</span>
                  {memberGroups.invited_group_count !== 0 && (
                    <span>(+{memberGroups.invited_group_count})</span>
                  )}
                </div>
                <Button
                  styles={{ $size: 'small', $variant: 'default' }}
                  children={
                    <img
                      src={ChevronDown}
                      alt="펼치기"
                      className={open ? 'rotate-180 transform w-5' : 'w-5'}
                    />
                  }
                />
              </Disclosure.Button>
              <Disclosure.Panel>{renderInvitedGroupList()}</Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Divider />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <img src={Users} alt="그룹" className="w-4" />
              <div>나의 그룹</div>
            </div>
            <Tooltip
              children={
                <Button
                  onClick={openModal}
                  styles={{ $size: 'small', $variant: 'default' }}
                  children={
                    <img
                      src={Plus}
                      alt="그룹 생성"
                      className="w-5 cursor-pointer"
                    />
                  }
                />
              }
              text={'그룹 생성'}
            />
          </div>
          {renderGroupList()}
        </div>
      </Container>
      <GroupCreateModal
        isOpen={isModalOpen}
        init={groupCreateInit}
        handleClose={closeModal}
        handleConfirm={handleCreateGroup}
      />
    </>
  );
}

export default GroupList;
