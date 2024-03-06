type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  username: string;
  password: string;
};

type ProductType = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  product_type: string;
};

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
};

type CartType = {
  id: number;
  quantity: number;
  time: string;
  userId: number;
  productId: number;
};

type ReviewType = {
  product_id: number;
  rating: number;
  review_text: string;
};

type CartItemType = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  product_type: string;
  quantity: number;
};
