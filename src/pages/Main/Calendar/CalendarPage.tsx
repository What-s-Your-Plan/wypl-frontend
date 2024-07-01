import CalendarContent from '@/components/calendar/CalendarContent';
import WidgetList from '@/components/widget/WidgetList';

function CalendarPage() {
  return (
    <div className="container flex items-center justify-around ss:max-sm:block h-dvh">
      <WidgetList />
      <CalendarContent category="MEMBER" />
    </div>
  );
}

export default CalendarPage;
