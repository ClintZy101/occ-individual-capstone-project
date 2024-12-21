import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function useInactivityLogout() {
  const { signOut, token, tokenExpiry } = useAuthStore();
//  console.log('token',token),
//  console.log('tokenExpiry',tokenExpiry)

  useEffect(() => {
    if (!token || (tokenExpiry && new Date() > new Date(tokenExpiry))) {
      signOut();
    }
  }, [token, tokenExpiry, signOut]);

  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        signOut();
        alert("You have been logged out due to inactivity.");
      }, 3600000); // 1 hour in milliseconds
    };

    // Listen for user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Initialize the timer
    resetTimer();

    // Cleanup event listeners on component unmount
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [signOut, token]);
}
