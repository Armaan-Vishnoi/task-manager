"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";

type LoadingContextType = {
  start: () => void;
  stop: () => void;
  loading: boolean;
};

const LoadingContext = createContext<LoadingContextType>({
  start: () => {},
  stop: () => {},
  loading: false,
});

export function useLoading() {
  return useContext(LoadingContext);
}

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  // Configuration: show loader only if request lasts longer than SHOW_DELAY_MS
  // and keep loader visible at least MIN_VISIBLE_MS to avoid flicker.
  const SHOW_DELAY_MS = 200;
  const MIN_VISIBLE_MS = 300;

  const [visible, setVisible] = useState(false);
  const activeCountRef = useRef(0);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const visibleStartRef = useRef<number | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const originalFetch = window.fetch;

    const scheduleShow = () => {
      if (showTimerRef.current) return;
      showTimerRef.current = window.setTimeout(() => {
        showTimerRef.current = null;
        if (!mounted.current) return;
        if (activeCountRef.current > 0) {
          setVisible(true);
          visibleStartRef.current = Date.now();
        }
      }, SHOW_DELAY_MS) as unknown as number;
    };

    const scheduleHide = () => {
      // If never shown, simply clear any pending show timer
      if (!visible) {
        if (showTimerRef.current) {
          clearTimeout(showTimerRef.current as number);
          showTimerRef.current = null;
        }
        return;
      }

      const elapsed = visibleStartRef.current ? Date.now() - visibleStartRef.current : MIN_VISIBLE_MS;

      if (elapsed >= MIN_VISIBLE_MS) {
        setVisible(false);
        visibleStartRef.current = null;
      } else {
        // ensure min visible duration
        if (hideTimerRef.current) return;
        hideTimerRef.current = window.setTimeout(() => {
          hideTimerRef.current = null;
          setVisible(false);
          visibleStartRef.current = null;
        }, MIN_VISIBLE_MS - elapsed) as unknown as number;
      }
    };

    // Wrap global fetch to automatically show loader for longer network requests
    window.fetch = async (...args: Parameters<typeof fetch>) => {
      activeCountRef.current = activeCountRef.current + 1;

      // only schedule showing the loader after a short delay
      scheduleShow();

      try {
        const res = await originalFetch(...args);
        return res;
      } finally {
        activeCountRef.current = Math.max(0, activeCountRef.current - 1);

        if (activeCountRef.current === 0) {
          // no more active requests — hide loader respecting min duration
          scheduleHide();
        }
      }
    };

    return () => {
      mounted.current = false;

      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }

      // restore original fetch
      try {
        window.fetch = originalFetch;
      } catch (e) {
        // ignore
      }
    };
  }, [visible]);

  const start = () => {
    activeCountRef.current = activeCountRef.current + 1;
    scheduleShowManual();
  };

  const stop = () => {
    activeCountRef.current = Math.max(0, activeCountRef.current - 1);
    if (activeCountRef.current === 0) scheduleHideManual();
  };

  // helper manual schedule functions (kept outside effect scope for start/stop)
  const scheduleShowManual = () => {
    if (showTimerRef.current) return;
    showTimerRef.current = window.setTimeout(() => {
      showTimerRef.current = null;
      if (activeCountRef.current > 0) {
        setVisible(true);
        visibleStartRef.current = Date.now();
      }
    }, SHOW_DELAY_MS) as unknown as number;
  };

  const scheduleHideManual = () => {
    if (!visible) {
      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current as number);
        showTimerRef.current = null;
      }
      return;
    }

    const elapsed = visibleStartRef.current ? Date.now() - visibleStartRef.current : MIN_VISIBLE_MS;
    if (elapsed >= MIN_VISIBLE_MS) {
      setVisible(false);
      visibleStartRef.current = null;
    } else {
      if (hideTimerRef.current) return;
      hideTimerRef.current = window.setTimeout(() => {
        hideTimerRef.current = null;
        setVisible(false);
        visibleStartRef.current = null;
      }, MIN_VISIBLE_MS - elapsed) as unknown as number;
    }
  };

  const value = {
    start,
    stop,
    loading: visible,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}

      {visible && (
        <div className="fixed inset-0 z-[999]">
          <Loader />
        </div>
      )}
    </LoadingContext.Provider>
  );
}
