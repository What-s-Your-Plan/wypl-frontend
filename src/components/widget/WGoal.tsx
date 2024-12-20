import { useEffect, useRef, useState } from 'react';

import { getMemberGoal } from '@/api/widget/getMemberGoal.ts';
import { patchMemberGoal } from '@/api/widget/patchMemberGoal.ts';
import Edit from '@/assets/icons/edit.svg';
import Save from '@/assets/icons/save.svg';
import Button from '@/components/Common/Button/Button.tsx';
import Input from '@/components/Common/Input/Input';
import useMemberStore from '@/stores/MemberStore';

function WGoal() {
  const { memberId } = useMemberStore();
  const [isModifyingGoal, setIsModifyingGoal] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);
  const [content, setContent] = useState<string>('');

  const handleModify = async () => {
    setIsModifyingGoal(!isModifyingGoal);
    if (memberId !== undefined) {
      const { body } = await patchMemberGoal(
        { memberId },
        { content: content },
      );
      setContent(body.content);
    }
  };

  useEffect(() => {
    const fetchUserGoal = async () => {
      if (memberId) {
        const { body } = await getMemberGoal({ memberId });
        setContent(body.content);
      }
    };

    if (isMounted.current) {
      return;
    }
    fetchUserGoal().then(() => {
      isMounted.current = true;
    });
  }, [memberId]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="font-bold">Goal</div>
        {isModifyingGoal ? (
          <Button
            styles={{ $size: 'small', $variant: 'primary' }}
            onClick={handleModify}
            children={<img src={Save} alt="저장" className="w-5" />}
          />
        ) : (
          <Button
            styles={{ $size: 'small', $variant: 'default' }}
            onClick={handleModify}
            children={<img src={Edit} alt="수정" className="w-5" />}
          />
        )}
      </div>
      <div>
        <Input
          $size="small"
          value={content}
          disabled={!isModifyingGoal}
          onChange={(e) => setContent(e.target.value)}
          maxLength={60}
          placeholder="목표를 입력해주세요(60자 이내)"
        />
      </div>
    </div>
  );
}

export default WGoal;
