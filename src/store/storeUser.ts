import Cookies from 'universal-cookie';
import { storageKey } from 'utils/storageKey';
import { create } from 'zustand';
const cookies = new Cookies();

interface IUser {
  authorized: boolean;
  data: any;
  addUserInfo: (data: any) => void;
  removeUserInfo: () => void;
}

const initialState = {
  authorized: cookies.get(storageKey.ACCESS_TOKEN) ? true : false,
  data: '',
};

export const useUserStore = create<IUser>((set) => ({
  ...initialState,
  addUserInfo: (newData: any) => {
    set({
      data: newData,
      authorized: true
    })
  },
  removeUserInfo: () => {
    set({
      authorized: false,
      data: '',
    })
  },
}));