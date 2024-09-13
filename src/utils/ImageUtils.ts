import defaultProfileImage from '@/assets/icons/user.svg';

const getMemberProfileImageOrDefault = (memberProfileImage?: string) => {
  return memberProfileImage || defaultProfileImage;
};

export { getMemberProfileImageOrDefault };
