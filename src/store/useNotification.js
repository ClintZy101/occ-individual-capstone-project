import { create } from "zustand";

const useNotification = create((set) => ({
  // State variables
  notificationIsActive: false, // Tracks if notifications are active
  notificationCount: 0,       // Number of active notifications

  // Actions
  setNotificationActive: (status) =>
    set(() => ({
      notificationIsActive: status,
    })), // Updates the active status of notifications

  setNotificationCount: (count) =>
    set(() => ({
      notificationCount: count,
    })), // Updates the count of notifications

  incrementNotificationCount: () =>
    set((state) => ({
      notificationCount: state.notificationCount + 1,
    })), // Increments the notification count by 1

  decrementNotificationCount: () =>
    set((state) => ({
      notificationCount: Math.max(state.notificationCount - 1, 0),
    })), // Decrements the notification count but ensures it doesn't go below 0

  resetNotifications: () =>
    set(() => ({
      notificationIsActive: false,
      notificationCount: 0,
    })), // Resets both active status and count
}));

export default useNotification;
