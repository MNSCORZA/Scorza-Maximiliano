import { useEffect, useCallback, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../fireBase/config';

export const useAutoLogout = (user, timeoutMins = 30) => {
  const timeoutRef = useRef(null);
  const TIMEOUT_IN_MS = timeoutMins * 60 * 1000;

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleLogout, TIMEOUT_IN_MS);
  }, [handleLogout, TIMEOUT_IN_MS]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    if (user) {
      resetTimer();
      events.forEach(event => window.addEventListener(event, resetTimer));
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user, resetTimer]);
};