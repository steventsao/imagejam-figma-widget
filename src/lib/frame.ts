import { imagekit_base } from "@/lib/constants";
// https://ik.imagekit.io/cirnjtkq1/steven-test-swing/frame_0700.png

export const getFrameUrl = (
  frame: number,
  key: string,
  urlBase = imagekit_base
): string => {
  // for frame 1, return frame_0001.png, for frame 750, return frame_0750.png
  let frameString = frame.toString();
  let frameLength = frameString.length;
  while (frameLength < 4) {
    frameString = "0" + frameString;
    frameLength++;
  }
  return `${urlBase}/${key}/frame_${frameString}.png`;
};
export const getFrameUrls = (maxFrame: number, key: string): string[] => {
  let currentFrame = 1;
  const urls: string[] = [];
  while (currentFrame <= maxFrame) {
    urls.push(getFrameUrl(currentFrame, key));
    currentFrame++;
  }
  return urls;
};
