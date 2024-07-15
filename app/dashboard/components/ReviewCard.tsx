"use client";

import React from "react";
import ReactStars from "react-rating-star-with-type";

interface ReviewCardProps {
  rating: number;
  comment: string;
  productId: string;
  userId: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  comment,
  productId,
  userId,
}) => {
  return (
    <div>
      <ReactStars
        value={rating}
        isEdit={true}
        activeColors={["red", "orange", "orange", "#FFCE00", "#FFCE00"]}
      />
      <p className="mt-2">{comment}</p>
    </div>
  );
};

export default ReviewCard;
