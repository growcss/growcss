export const isSsr =
  typeof window === 'undefined' || window.navigator.userAgent === 'ReactSnap';
