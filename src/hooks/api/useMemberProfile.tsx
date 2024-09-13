import { getMemberProfile } from '@/api/member/getMemberProfile';
import useMemberStore from '@/stores/MemberStore';

export default function useMemberProfile() {
  const { setProfile } = useMemberStore();

  const requestMemberProfile = async (memberId: number) => {
    const { body } = await getMemberProfile({ memberId });

    setProfile(body);
  };

  return { requestMemberProfile };
}
