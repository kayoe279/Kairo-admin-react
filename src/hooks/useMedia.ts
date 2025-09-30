import { useMediaQuery } from "usehooks-ts";

export const useIsMobile = () => {
  return useMediaQuery("(max-width: 640px)");
};

export const useIsTablet = () => {
  return useMediaQuery("(min-width: 640px) and (max-width: 1024px)");
};

export const useIsDesktop = () => {
  return useMediaQuery("(min-width: 1024px)");
};
