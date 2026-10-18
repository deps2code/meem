"use client";

import { useSyncExternalStore } from "react";

// Fraction of the hero that must scroll away before the chrome docks to the top.
const DOCK_THRESHOLD = 0.5;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);

  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

function getSnapshot() {
  return window.scrollY > window.innerHeight * DOCK_THRESHOLD;
}

function getServerSnapshot() {
  return false;
}

export function useNavDocked() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
