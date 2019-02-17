import { isSsr } from './is-ssr';

export const getDimension = (): { width: number; height: number } => {
  if (isSsr) {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight,
  };
};
