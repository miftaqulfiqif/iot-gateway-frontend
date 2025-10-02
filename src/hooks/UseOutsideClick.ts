import { useEffect } from "react";

type RefElement = React.RefObject<HTMLElement | null>;

export function useOutsideClickMulti(
  refs: RefElement[],
  callback: () => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    function handleClick(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      const isInside = refs.some((ref) => ref.current?.contains(target));

      if (!isInside) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [refs, callback, enabled]);
}
