import { FC } from "react";

interface TextSimilarityProps {
  results: Array<{
    id: string;
    text: [string, string];
    score: number;
  }>;
}

const TextSimilarity: FC<TextSimilarityProps> = ({ results }) => {
  return results.map((data) => (
    <div key={data.id} className="mt-10">
      <div className="flex items-center">
        <div className="w-64 h-20 border border-gray-400 p-2">
          {data.text[0]}
        </div>
        <svg className="h-8 w-16 mx-2">
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="#b91ea1"
            strokeWidth="2"
          />
        </svg>
        <h1>{data.score}%</h1>
        <svg className="h-8 w-16 mx-2">
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="#b91ea1"
            strokeWidth="2"
          />
        </svg>
        <div className="w-64 h-20 border border-gray-400 p-2">
          {data.text[1]}
        </div>
      </div>
    </div>
  ));
};

export default TextSimilarity;
