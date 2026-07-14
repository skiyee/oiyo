import type { AppStore } from '~/stores/app'

export interface RootContext {
  title: Ref<string>;
  count: Ref<number>;
  increment: () => void;
  isDark: Readonly<Ref<boolean>>;
  appStore: AppStore;
}
