import { Theme } from '@/utils/tokenManger';

const saveTheme = async (nextTheme: Theme) => {
  await fetch('/api/theme', {
    method: 'POST',
    body: JSON.stringify({ theme: nextTheme }),
  });
};

export default saveTheme;
