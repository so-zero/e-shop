"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReactStars from "react-rating-star-with-type";

interface ReviewProps {
  productId?: string;
  userId?: string;
}

const Review: React.FC<ReviewProps> = ({ productId, userId }) => {
  const router = useRouter();
  const defaultReview = {
    star: 0,
    comment: "",
    productId: productId,
    userId: userId,
  };
  const [reviewForm, setReviewForm] = useState(defaultReview);

  const onChange = (nextValue: any) => {
    setReviewForm((prevStar) => ({ ...prevStar, star: nextValue }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReviewForm((prevComment) => ({ ...prevComment, [name]: value }));
  };

  const postData = async () => {
    try {
      const response = await axios.post("/api/review", reviewForm);
      setReviewForm(defaultReview);
      console.log(response.data);

      router.refresh();
    } catch (error) {
      console.log("review error", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">리뷰 작성하기</h1>
      <h2 className="mb-2">상품은 만족하셨나요?</h2>
      <ReactStars
        onChange={onChange}
        value={reviewForm.star}
        size={20}
        isEdit={true}
        activeColors={["red", "orange", "orange", "#FFCE00", "#FFCE00"]}
      />
      <h2 className="mt-4">내용</h2>
      <div>
        <input
          type="text"
          name="comment"
          onChange={handleChange}
          value={reviewForm.comment}
          className="border-[1px] border-gray-300 rounded-md w-full h-[40px] focus:border-gray-500 outline-none px-2 mt-2"
        />
      </div>
      <button
        className="px-5 p-2 border-[1px] bg-gray-600 text-white rounded-md mt-5"
        onClick={postData}
      >
        작성하기
      </button>
    </div>
  );
};

export default Review;
