import { create } from 'zustand';

interface ILoading {
  loading: number;
  showLoading: () => void;
  hideLoading: () => void;
}

export const useLoadingStore = create<ILoading>((set, get) => ({
  loading: 0,
  showLoading: () => set({ loading: get().loading + 1 }),
  hideLoading: () => set({ loading: get().loading - 1 }),
  resetLoading: () => set({ loading: 0 })
}));

export function showLoading() {
  const loading = useLoadingStore.getState().loading;
  useLoadingStore.setState({ loading: loading + 1 });
}

export function hideLoading() {
  const loading = useLoadingStore.getState().loading;
  useLoadingStore.setState({ loading: loading - 1 });
}