export function getViewport() {
  return {
    width: globalThis.innerWidth,
    height: globalThis.innerHeight,
    aspect: globalThis.innerWidth / globalThis.innerHeight,
  };
}
