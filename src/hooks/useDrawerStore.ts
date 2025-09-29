import { useSyncExternalStore } from 'react';
import { drawerStore } from '@/components/Drawer/DrawerStore';

export const useDrawerStore = () => {
  return useSyncExternalStore(
    (cb) => drawerStore.subscribe(cb),
    () => drawerStore.get(),
    () => drawerStore.get()
  );
};
