interface SearchMemberForCreateGroupData {
  id: number;
  email: string;
  nickname: string;
  profile_image_url: string | null;
}

type MemberProfileData = {
  id: number;
  email: string;
  nickname: string;
  profile_image_url: string | null;
  main_color: string;
};
