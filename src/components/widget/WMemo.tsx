import { useEffect, useRef, useState } from 'react';

import { getMemberMemo } from '@/api/widget/getMemberMemo.ts';
import { patchMemberMemo } from '@/api/widget/patchMemberMemo.ts';
import Edit from '@/assets/icons/edit.svg';
import Save from '@/assets/icons/save.svg';
import Button from '@/components/Common/Button/Button.tsx';
import { InputTextArea } from '@/components/Common/InputText';
import useMemberStore from '@/stores/MemberStore';

function WMemo() {
  const { memberId } = useMemberStore();
  const [isModifyingMemo, setIsModifyingMemo] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);
  const [userMemo, setUserMemo] = useState<string>('');

  const handleModify = async () => {
    setIsModifyingMemo(!isModifyingMemo);
    if (memberId !== undefined) {
      const { body } = await patchMemberMemo({ memberId }, { memo: userMemo });
      setUserMemo(body.memo);
    }
  };

  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setUserMemo(newContent);
    if (textarea.current) {
      textarea.current.style.height = 'auto'; //height 초기화
      let newHeight = textarea.current.scrollHeight;
      if (newHeight > 120) {
        newHeight = 120;
      }
      textarea.current.style.height = newHeight + 'px';
    }
  };

  useEffect(() => {
    const fetchUserMemo = async () => {
      if (memberId) {
        const { body } = await getMemberMemo({ memberId });
        setUserMemo(body.memo);
      }
    };

    if (isMounted.current) {
      return;
    }
    fetchUserMemo().then(() => {
      isMounted.current = true;
    });
  }, [memberId]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="font-bold">Memo</div>
        {isModifyingMemo ? (
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
        <InputTextArea
          className="disabled:bg-transparent scrollBar"
          $width="100%"
          $void={true}
          $resize={false}
          ref={textarea}
          rows={5}
          value={userMemo}
          disabled={!isModifyingMemo}
          onChange={handleTextInput}
          maxLength={1000}
          placeholder="메모를 입력해주세요"
        />
      </div>
    </div>
  );
}

export default WMemo;
