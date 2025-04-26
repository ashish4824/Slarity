
export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductFilter {
  search?: string;
  categoryId?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
}