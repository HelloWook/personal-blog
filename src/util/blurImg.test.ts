import { getBlurImg, getBlurLocalImg } from '@/util/blurImg';
describe('블러 관련 함수 테스팅', () => {
  it('getBlurImg 함수가 정상적으로 작동해야 한다', async () => {
    const imgSrc = 'https://example.com/image.jpg'; // 실제 이미지 URL로 변경
    const result = await getBlurImg(imgSrc);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('getBlurLocalImg 함수가 정상적으로 작동해야 한다', async () => {
    const imgPath = 'public/images/test.jpg'; // 실제 로컬 이미지 경로로 변경
    const result = await getBlurLocalImg(imgPath);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});
