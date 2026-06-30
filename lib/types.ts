export interface Product {
  title: string;
  description: string;
  image: string;
  price: number;
  slug: string;
  category: string;
}

export interface Category {
  key: string;
  label: string;
  image: string;
}

export interface WishlistItem {
  product: Product;
  quantity: number;
}

export interface WishlistContextType {
  wishlist: WishlistItem[];
  totalItems: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (slug: string) => void;
  increaseQuantity: (slug: string) => void;
  decreaseQuantity: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}
