import Calendar   from '@/components/Calendar/Calendar.tsx';
import WidgetList from '@/components/widget/WidgetList';

function CalendarPage() {
  return (
    <div className="container flex items-center justify-around ss:max-sm:block h-dvh">
      <WidgetList />
      <Calendar category='MEMBER' />
    </div>
  );
}

export default CalendarPage;
