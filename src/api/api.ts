import { Product, ProductFilter } from '../types';
const API_URL = 'https://api.escuelajs.co/api/v1';
export const fetchProducts = async (filter?: ProductFilter): Promise<Product[]> => {
  try {
    let url = `${API_URL}/products`;
    const queryParams: string[] = [];
    queryParams.push('offset=0');
    queryParams.push('limit=50');
    if (filter?.search) {
    }
    if (filter?.categoryId) {
      queryParams.push(`categoryId=${filter.categoryId}`);
    }
    if (filter?.priceRange?.min) {
      queryParams.push(`price_min=${filter.priceRange.min}`);
    }
    
    if (filter?.priceRange?.max && filter.priceRange.max !== Infinity) {
      queryParams.push(`price_max=${filter.priceRange.max}`);
    }
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    let products = await response.json();
    
    if (filter?.search && products.length > 0) {
      const searchTerm = filter.search.toLowerCase();
      products = products.filter((product: Product) => 
        product.title.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filter?.sortBy && products.length > 0) {
      products = sortProducts(products, filter.sortBy);
    }
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};
export const fetchProductBySlug = async (slug: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/products/slug/${slug}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    throw error;
  }
};
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sortedProducts;
  }
};