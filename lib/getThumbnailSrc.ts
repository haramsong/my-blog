// 목록에서 사용할 작은 썸네일(webp) 경로를 반환합니다.
// 예) /images/.../thumbnail-foo.png -> /images/.../thumbnail-foo-sm.webp
// 리사이즈된 파일은 build:images(convert-to-webp) 단계에서 생성됩니다.
export const SMALL_THUMBNAIL_WIDTH = 400;

export const getSmallThumbnailSrc = (src: string): string => {
  if (!src) return src;

  if (/\.(png|jpe?g|webp)$/i.test(src)) {
    return src.replace(/\.(png|jpe?g|webp)$/i, "-sm.webp");
  }

  // svg 등 리사이즈 대상이 아니면 원본을 그대로 사용
  return src;
};
