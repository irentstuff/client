import React, { useEffect, useState } from 'react';
import { getReviewById } from '../services/api';

function HomePage() {
  const [review, setReview] = useState(null);

  useEffect(() => {
    async function fetchReview() {
      const data = await getReviewById();
      setReview(data);
    }
    fetchReview();
  }, []);

  return (
    <div>
      <h1>WELCOME TO IRENTSTUFF</h1>
      {review ? (
        <div>
          <h2>Review {review.id}</h2>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
          <p>User ID: {review.user}</p>
          <p>Item ID: {review.item}</p>
          <p>Date: {new Date(review.created_at).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading review...</p>
      )}
    </div>
  );
}

export default HomePage;
