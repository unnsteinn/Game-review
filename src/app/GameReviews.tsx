import React, { useState } from "react";

type Review = {
  name: string;
  desc: string;
  review: number;
};

const GameReview = ({
  name,
  desc,
  review,
  onClick,
}: {
  name: string;
  desc: string;
  review: number;
  onClick: () => void;
}) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <div>{name}</div>
    </div>
  );
};

const App = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({
    name: "",
    desc: "",
    review: 0,
  });
  const [showReview, setShowReview] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setNewReview({ name: "", desc: "", review: 0 });
    setShowReview(false);
  };

  const handleReviewClick = (review: Review) => {
    if (selectedReview && selectedReview.name === review.name) {
      setSelectedReview(null);
    } else {
      setSelectedReview(review);
      setShowReview(false);
    }
  };

  return (
    <div>
      {reviews.map((review, index) => (
        <GameReview
          key={index}
          name={review.name}
          desc={review.desc}
          review={review.review}
          onClick={() => handleReviewClick(review)}
        />
      ))}
      {showReview && (
        <>
          <div>
            Name :{" "}
            <input
              className="border"
              type="text"
              name="name"
              value={newReview.name}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            Desc :{" "}
            <input
              className="border"
              type="text"
              name="desc"
              value={newReview.desc}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            Score :{" "}
            <input
              className="border"
              type="number"
              name="review"
              value={newReview.review.toString()}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>Pic :</div>
          <button style={{ border: "1px solid #eee" }} onClick={handleSave}>
            Save
          </button>
        </>
      )}
      {selectedReview && (
        <div className="border w-fit bg-black text-white">
          <h2>Selected Review</h2>
          <div>Name: {selectedReview.name}</div>
          <div>Description: {selectedReview.desc}</div>
          <div>Review: {selectedReview.review}</div>
        </div>
      )}
      {!showReview && !selectedReview && (
        <button
          style={{ border: "1px solid #eee", marginTop: "10px" }}
          onClick={() => setShowReview(true)}
        >
          New review
        </button>
      )}
    </div>
  );
};

export default App;
