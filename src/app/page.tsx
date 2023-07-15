import Image from "next/image";
import TextSimilarity from "@/components/TextSimilarity";

export default function Home() {
  return (
    <div className="flex justify-center items-center v-screen">
      <div className="w-full max-w-md flex flex-col justify-center items-center mt-5">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="https://youtu.be/8_d5AqKfCI4"
            className="input input-lg input-bordered input-primary w-80 text-xl"
          />
          <button className="btn btn-outline btn-primary ml-5 text-xl">
            🚀🦜✨🪄
          </button>
        </div>
        <TextSimilarity
          results={[
            {
              id: "1",
              text: [
                "The kitty is taking a nap on the mat",
                "The small cat is sleeping on the soft mat.",
              ],
              score: 100,
            },
            {
              id: "2",
              text: [
                "Today was a good monday",
                "I love monday, it's the best day of the week!",
              ],
              score: 90,
            },
          ]}
        />
      </div>
    </div>
  );
}
