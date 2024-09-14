import { LabelColorsType } from '@/assets/styles/colorThemes.ts';

interface SearchMemberForCreateGroupData {
  id: number;
  email: string;
  nickname: string;
  profile_image_url: string | undefined;
}

interface MemberProfileData {
  id: number;
  email: string;
  nickname: string;
  profile_image_url: string | undefined;
  main_color: LabelColorsType;
}
