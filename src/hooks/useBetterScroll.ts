import { useCallback, useEffect, useRef, useState } from "react";
import BScroll, { type Options } from "@better-scroll/core";

export function useBetterScroll(
  options?: Options,
  deps: any[] = [] // 内容变化时触发 refresh
) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [bs, setBs] = useState<BScroll | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const instance = new BScroll(wrapperRef.current, options || {});
    setBs(instance);

    return () => {
      instance.destroy();
      setBs(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 手动 refresh
  const bsRefresh = useCallback(() => {
    bs?.refresh();
  }, [bs]);

  // 滚动到指定坐标
  const bsScrollTo = useCallback(
    (x: number, y: number, time: number = 500, easing?: any) => {
      bs?.scrollTo(x, y, time, easing);
    },
    [bs]
  );

  // 滚动到指定元素
  const bsScrollToElement = useCallback(
    (el: HTMLElement | string, time: number = 500, offsetX: number = 0, offsetY: number = 0) => {
      bs?.scrollToElement(el, time, offsetX, offsetY);
    },
    [bs]
  );

  // 通过客户端 X 坐标滚动到中间
  const scrollByClientX = useCallback(
    (clientX: number) => {
      if (!bs || !wrapperRef.current) return;

      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const currentX = clientX - wrapperRect.left;
      const deltaX = currentX - wrapperRect.width / 2;

      const { maxScrollX, x: leftX, scrollBy } = bs;

      const rightX = maxScrollX - leftX;
      const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX);

      scrollBy(update, 0, 300);
    },
    [bs, wrapperRef]
  );

  // 内容变化时自动 refresh
  useEffect(() => {
    bsRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bsRefresh, ...deps]);

  return { wrapperRef, bs, bsRefresh, bsScrollTo, bsScrollToElement, scrollByClientX };
}
