import { LabelColorType } from '@/styles/Theme';

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
  main_color: LabelColorType;
}
