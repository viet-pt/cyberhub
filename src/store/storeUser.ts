import { create } from 'zustand';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

interface IUser {
  authorized: boolean;
  data: any;
  addUserInfo: (data: any) => void;
  removeUserInfo: () => void;
}

const initialState = {
  authorized: cookies.get('token') ? true : false,
  data: null,
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
      data: null,
    })
  },
}));