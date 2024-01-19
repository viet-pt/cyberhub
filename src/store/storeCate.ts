import { create } from 'zustand';

interface ICate {
  data: any;
  addCateStore: (data: any) => void;
}

const initialState = {
  data: [],
};

export const useCateStore = create<ICate>((set) => ({
  ...initialState,
  addCateStore: (newData: any) => {
    set({ data: newData })
  },
}));