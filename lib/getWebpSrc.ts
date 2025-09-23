export const getWebpSrc = (src: string): string => {
  if (!src) return src;

  // png, jpg, jpeg면 webp 버전 시도
  if (/\.(png|jpe?g)$/i.test(src)) {
    return src.replace(/\.(png|jpe?g)$/i, ".webp");
  }

  return src;
};
