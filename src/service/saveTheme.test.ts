import saveTheme from './saveTheme';

describe('saveTheme 서비스 함수', () => {
  it('테마를 서버에 저장하는지 확인한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'ok' }),
      } as Response)
    ) as jest.Mock;
    await saveTheme('synthwave');
    expect(global.fetch).toHaveBeenCalledWith('/api/theme', {
      method: 'POST',
      body: JSON.stringify({ theme: 'synthwave' }),
    });
  });
});
