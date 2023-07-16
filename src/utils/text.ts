export const getVideoId = (url: string) => {
  const videoUrl = new URL(url);
  let videoId = null;
  if (videoUrl.hostname.includes("youtube.com")) {
    videoId = videoUrl.searchParams.get("v");
  } else if (videoUrl.hostname.includes("youtu.be")) {
    videoId = videoUrl.pathname.replace("/", "");
  }

  return videoId;
};
