import {Product} from './Product';

export interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
  removeCart(id: string): void;
}
