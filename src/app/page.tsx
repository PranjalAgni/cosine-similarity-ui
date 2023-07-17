"use client";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import useSWRMutation from "swr/mutation";
import { nanoid } from "nanoid";
import TextSimilarity from "@/components/TextSimilarity";
import { getVideoId } from "../utils/text";

interface SimilarityResult {
  id: string;
  text: [string, string];
  score: number;
}

interface YTSimilarityResponse {
  data: {
    text1: string;
    text2: string;
    similarityScore: string;
  }[];
}

async function fetchSimilarReplies(
  url: string,
  { arg }: { arg: { videoId: string } }
) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_V1}${url}/${arg.videoId}`;
  console.log("Calling API here: ", API_URL);
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string>("");
  const [results, setResults] = useState<Array<SimilarityResult>>([]);

  const { trigger } = useSWRMutation("/yt/comments", fetchSimilarReplies);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResults([]);
    setVideoURL(videoURL);
    console.log("Video URL: ", videoURL);

    try {
      const videoId = getVideoId(videoURL);
      if (videoId) {
        const response = await trigger({ videoId });
        const results = (await response.json()) as YTSimilarityResponse;
        console.log("data: ", results);
        const formattedSimilarityResponse: Array<SimilarityResult> =
          results.data.map((obj) => ({
            id: nanoid(4),
            text: [obj.text1, obj.text2],
            score: Math.ceil(parseFloat(obj.similarityScore) * 100),
          }));
        setResults(formattedSimilarityResponse);
      } else {
        console.log("Video ID not found will show error popup");
        throw new Error("Incorrect video URL please check again");
      }
    } catch (ex) {
      console.log("Error: ", ex);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setVideoURL(event.target.value);
  };

  return (
    <div className="flex justify-center items-center v-screen">
      <div className="w-full max-w-md flex flex-col justify-center items-center mt-5">
        <div className="flex items-center">
          <input
            type="text"
            value={videoURL}
            onChange={handleChange}
            placeholder="https://youtu.be/8_d5AqKfCI4"
            className="input input-lg input-bordered input-primary w-80 text-xl"
          />
          <button
            className="btn btn-outline btn-primary ml-5 text-xl"
            onClick={handleSubmit}
          >
            🚀🦜✨🪄
          </button>
        </div>
        {isLoading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          <TextSimilarity results={results} />
        )}
      </div>
    </div>
  );
}
