import create, { SetState } from "zustand";

export type IAuth = {
  isLoggedIn: boolean;
  token: string | any;
  setToken: (token: string) => any;
  removeToken: () => any;
};

export const AUTH_TOKEN_KEY = "token";

const authResolver = (set: SetState<IAuth>) => ({
  token: localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") ? true : false,
  setToken: async (token: string) => {
    if (token) {
      const bearer = `Bearer ${token}`;
      //@ts-ignore
      set((state) => {
        state.token = bearer;
        state.isLoggedIn = true;
      });
      localStorage.setItem(AUTH_TOKEN_KEY, bearer);
    }
  },
  removeToken: async () => {
    //@ts-ignore
    set((state) => {
      state.token = null;
      state.isLoggedIn = false;
    });
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
});
export const useAuthStore = create(authResolver);
