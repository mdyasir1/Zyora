export interface Product {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  category?: string;
  rating?: number;
  stock?: number;
  discountPercentage?: number;
  brand?: string;
  images?: string[];
}

// Add these new interfaces
export interface CategoryColors {
  bg: string;
  text: string;
  gradient: string;
  border: string;
}

export interface SearchParams {
  search?: string;
  category?: string;
}

export interface SortOption {
  value: string;
  label: string;
}
