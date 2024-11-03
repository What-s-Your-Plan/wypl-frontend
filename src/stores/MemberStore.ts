import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MemberProfileData } from '@/@types/Member';
import { LabelColorType } from '@/styles/Theme';
import { getMemberProfileImageOrDefault } from '@/utils/ImageUtils';

type MemberState = {
  memberId: number | undefined;
  profileImage: string;
  email: string | undefined;
  nickname: string | undefined;
  mainColor: LabelColorType | undefined;
  setId: (newId: number) => void;
  setProfileImage: (newProfileImage: string | undefined) => void;
  setEmail: (newEmail: string) => void;
  setNickname: (newNickname: string) => void;
  setMainColor: (newMainColor: LabelColorType) => void;
  setProfile: (profile: MemberProfileData) => void;
  resetMember: () => void;
};

const useMemberStore = create<MemberState>()(
  persist(
    (set): MemberState => ({
      memberId: undefined,
      profileImage: getMemberProfileImageOrDefault(undefined),
      email: undefined,
      nickname: undefined,
      mainColor: undefined,
      setId: (newMemberId: number) => {
        set(() => ({ memberId: newMemberId }));
      },
      setProfileImage: (newProfileImage: string | undefined) => {
        set(() => ({
          profileImage: getMemberProfileImageOrDefault(newProfileImage),
        }));
      },
      setEmail: (newEmail: string) => {
        set(() => ({
          email: newEmail,
        }));
      },
      setNickname: (newNickname: string) => {
        set(() => ({
          nickname: newNickname,
        }));
      },
      setMainColor: (newLabelColor: LabelColorType) => {
        set(() => ({
          mainColor: newLabelColor,
        }));
      },
      setProfile: (profile: MemberProfileData) => {
        set(() => ({
          nickname: profile.nickname,
          email: profile.email,
          profileImage: getMemberProfileImageOrDefault(
            profile.profile_image_url,
          ),
          mainColor: profile.main_color,
        }));
      },
      resetMember: () => {
        set(() => ({
          memberId: undefined,
          profileImage: undefined,
          email: undefined,
          nickname: undefined,
          mainColor: undefined,
        }));
      },
    }),
    {
      name: 'memberStorage',
    },
  ),
);

export default useMemberStore;
