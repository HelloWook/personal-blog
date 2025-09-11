import { getBlurImg, getBlurLocalImg } from '@/util/blurImg';
describe('블러 관련 함수 테스팅', () => {
  it('getBlurImg 함수가 정상적으로 작동해야 한다', async () => {
    const imgSrc = 'c'; // 실제 이미지 URL로 변경
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

  it('getBlurImg  잘못된 URL에 대해 빈 문자열을 반환해야 한다', async () => {
    const imgPath = 'public/images/nonexistent.jpg';
    const result = await getBlurLocalImg(imgPath);
    expect(result).toBe('');
  });

  it('getBlurLocalImg 잘못된 URL에 대해 빈 문자열을 반환해야 한다', async () => {
    const imgSrc = 'https://example.com/nonexistent.jpg';
    const result = await getBlurImg(imgSrc);
    expect(result).toBe('');
  });
});
