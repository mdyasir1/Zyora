import { Product } from './product';

export interface ProductCardProps {
  product: Product;
  searchQuery?: string;
}

export interface SplashScreenProps {
  onFinish: () => void;
}

export interface CartProviderProps {
  children: React.ReactNode;
}