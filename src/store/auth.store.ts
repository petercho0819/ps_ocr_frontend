import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthStoreState {
  auth: boolean;
  accessToken: string;
  refreshToken: string;
  user: any;
}

const initState: AuthStoreState = {
  auth: false,
  accessToken: '',
  refreshToken: '',
  user: null,
};
export interface AuthStoreActions {
  login: (props: Omit<AuthStoreState, 'auth'>) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  logout: () => void;
  updateUser: (user: any) => void;
}

const useAuthStore = create(
  persist<AuthStoreState & AuthStoreActions>(
    (set) => ({
      ...initState,
      login: ({ accessToken, refreshToken, user }) =>
        set({ auth: true, accessToken, refreshToken, user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      logout: () => set(initState),
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
export default useAuthStore;
