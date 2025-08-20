type Listener = () => void;

export class DrawerStore {
  private isOpen = false;
  private listeners = new Set<Listener>();

  get() {
    return this.isOpen;
  }

  set(next: boolean) {
    this.isOpen = next;
    this.notify();
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  toggle() {
    this.set(!this.isOpen);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }
}

export const drawerStore = new DrawerStore();
