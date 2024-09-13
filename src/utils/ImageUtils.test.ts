import { getMemberProfileImageOrDefault } from './ImageUtils';

describe('사용자의 프로필이미지를 반환한다.', () => {
  it('이미지가 존재하면 해당이미지를 반환한다.', () => {
    expect(getMemberProfileImageOrDefault('image.png')).toBe('image.png');
  });
});
