'use client';
import { useDrawerStore } from '@/hooks/useDrawerStore';
import { Link } from '@/i18n/navigation';
import { drawerStore } from './DrawerStore';
import {useTranslations} from 'next-intl';

const Drawer = () => {
  const isOpen = useDrawerStore();
  const t = useTranslations('Navigation');

  const closeDrawer = () => {
    drawerStore.set(false);
  };

  return (
    <div className='drawer drawer-end z-[99]'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle' checked={isOpen} readOnly />
      <div className='drawer-content'></div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer-4' aria-label='close sidebar' className='drawer-overlay'></label>
        <ul className='min-h-full p-4 menu bg-base-200 text-base-content w-80' onClick={closeDrawer}>
          <li>
            <Link href={'/posts'}>{t('posts')}</Link>
          </li>
          <li>
            <Link href={'/abouts'}>{t('abouts')}</Link>
          </li>
          <li>
            <Link href={'/projects'}>{t('projects')}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
