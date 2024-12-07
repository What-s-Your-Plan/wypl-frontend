import Calendar from '@/assets/icons/calendar.svg';
import Tag from '@/assets/icons/tag.svg';
import Users from '@/assets/icons/users.svg';

import Logo from '/logo.png';

import { PrevWhiteContainer } from '@/components/Common/PrevContainer';
import LabelButton from '@/components/Common/LabelButton';
import { LabelColorType } from '@/styles/Theme';
import { splitTTime } from '@/utils/DateUtils';

type VScheduleProps = {
  schedule: ScheduleSimpleResponse;
};

function VSchedule({ schedule }: VScheduleProps) {
  const renderMembers = () => {
    return schedule.members.map((member) => (
      <img
        key={member.member_id}
        className="inline-block h-8 w-8 rounded-full"
        src={member.profile_image ? member.profile_image : Logo}
        alt={member.nickname}
      />
    ));
  };

  return (
    <PrevWhiteContainer $width="900" className="flex flex-wrap gap-4">
      <div className="flex gap-4 text-sm">
        <img src={Calendar} alt="일정명" className="w-5" />
        <div>
          <div className="font-semibold">{schedule.title}</div>
          {schedule.start_date && schedule.end_date && (
            <div>
              {splitTTime(schedule.start_date as string)} ~{' '}
              {splitTTime(schedule.end_date as string)}
            </div>
          )}
        </div>
      </div>
      {schedule.label && (
        <div className="flex gap-4 items-center text-sm">
          <img src={Tag} alt="라벨" className="w-5" />
          <LabelButton
            className="text-base"
            $labelColor={schedule.label?.color as LabelColorType}
          >
            {schedule.label?.title}
          </LabelButton>
        </div>
      )}
      <div className="flex gap-4 items-center text-sm">
        <img src={Users} alt="참가자" className="w-5" />
        {renderMembers()}
      </div>
    </PrevWhiteContainer>
  );
}

export default VSchedule;
