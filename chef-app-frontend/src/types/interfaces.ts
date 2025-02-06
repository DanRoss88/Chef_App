interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface IDish {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  ingredients: string[];
  allergens: string[];
  available: boolean;
  updateDish: (dish: IDish) => void;
  deleteDish: (dishId: string) => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}



export type { IUser, IDish, ApiResponse};
