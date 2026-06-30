export interface Product {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  slug: string;
  category: string;
}

export interface Category {
  key: string;
  label: string;
}

export interface WishlistItem {
  product: Product;
  quantity: number;
}

export interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (item: WishlistItem) => void;
}
