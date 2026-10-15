let locks = 0;
let previousBodyOverflow = "";
let previousRootOverflow = "";

// Multiple dialogs can overlap, for example contact choices above the mobile menu.
export function lockPageScroll() {
  if (locks === 0) {
    previousBodyOverflow = document.body.style.overflow;
    previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }
  locks += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    }
  };
}
