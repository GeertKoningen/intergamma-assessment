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
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (item: WishlistItem) => void;
  increaseQuantity: (slug: string) => void;
  decreaseQuantity: (slug: string) => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}
