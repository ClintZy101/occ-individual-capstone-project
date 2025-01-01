import { create } from "zustand";

const useUserProfile = create((set) => ({
  user: null,
  setUser: (newUser) =>
    set(() => ({
      user: newUser,
    })),
}));

export default useUserProfile;
