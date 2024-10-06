import Calendar from '@/components/Calendar/Calendar.tsx';
import WidgetList from '@/components/widget/WidgetList';

function CalendarPage() {
  return (
    <div className="flex items-center h-dvh min-w-[1000px]">
      <WidgetList />
      <Calendar category={'MEMBER'} />
    </div>
  );
}

export default CalendarPage;
