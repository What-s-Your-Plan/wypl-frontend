import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Calendar  from '@/components/Calendar/Calendar.tsx';
import GroupList from '@/components/group/GroupList';

function GroupPage() {
  const { groupId } = useParams();
  const [id, setId] = useState<number | undefined>(undefined);
  useEffect(() => {
    setId(Number(groupId));
  }, [groupId]);

  return (
    <div className="container flex items-center justify-around ss:max-sm:block h-dvh">
      <GroupList />
      <Calendar category="GROUP" groupId={id} />
    </div>
  );
}

export default GroupPage;
