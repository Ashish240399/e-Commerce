import axios from "axios";

export async function addReview(
  {
    review,
  }: {
    review: ReviewType;
  },
  token: string
) {
  const response = await axios.post(
    "http://localhost:8000/reviews/createReview/",
    review,
    {
      headers: {
        Authorization: "Token " + token,
      },
    }
  );
  return response.data;
}
