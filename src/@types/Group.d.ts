import { LabelColorsType } from '@/styles/colorThemes.ts';

type Group = {
  id: number;
  name: string;
  color: string;
  is_owner: boolean;
};

type GroupUpdateInfo = {
  id: number;
  name: string;
  color: string;
};

/* Data */
interface GroupInfoData {
  name: string;
  color: LabelColorsType;
  member_id_list: Array<number>;
}

interface GroupMemberData {
  profile_image: string | undefined;
  is_accepted: boolean;
  id: number;
  email: string;
  nickname: string;
}

interface GroupSummaryData {
  id: number;
  name: string;
  color: LabelColorsType;
  is_owner: boolean;
}
