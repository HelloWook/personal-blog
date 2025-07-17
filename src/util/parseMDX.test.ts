import parseMDX from '@/util/parseMDX';
import fs from 'fs';
describe('parseMDX 함수가 정상적으로 작동한다.', () => {
  it('MDX 파일을 올바르게 파싱한다.', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue(`
             # Hello World
            This is a test MDX file.
        `);

    const mdxContent = `
        # Hello World
        This is a test MDX file.
        `;
    const result = parseMDX(mdxContent);
    expect(result).toBeDefined();
  });
});
