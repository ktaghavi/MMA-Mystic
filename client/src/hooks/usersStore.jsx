import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = (set) => ({
  user: null,
  updateUser: (newUser) =>
    set(() => ({
      user: newUser,
    })),
  deleteUser: () =>
    set(() => ({
      user: null,
    })),
});

const useUserStore = create(
    persist(userStore, {
      name: "user",
    })
);

export default useUserStore;