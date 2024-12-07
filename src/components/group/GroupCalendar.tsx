import { PrevContainer } from '@/components/Common/PrevContainer';

type GroupCalendarProps = {
  groupId?: number;
};

function GroupCalendar({ groupId }: GroupCalendarProps) {
  console.log(groupId);
  return <PrevContainer $width="right">GroupCalendar</PrevContainer>;
}

export default GroupCalendar;
