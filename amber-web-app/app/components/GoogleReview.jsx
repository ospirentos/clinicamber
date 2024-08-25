import React from "react";

export function GoogleReview({ reviewData }) {
  const { author_name, rating, text } = reviewData;

  return (
    <div className="flex flex-col items-center shadow-md min-w-[280px] sm:min-w-[450px] my-4 p-4">
      <div className="flex mx-auto my-4">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#F4B400"
            >
              <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
            </svg>
          ))}
      </div>
      <div>{text}</div>
      <div className="text-amber-500 mx-auto my-4">{author_name}</div>
    </div>
  );
}
