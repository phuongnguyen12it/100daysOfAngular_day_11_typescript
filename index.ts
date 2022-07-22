import 'reflect-metadata';

interface ProductModel {
  sku: string;
  name: string;
  price: number;
}

interface CartItem {
  product: ProductModel;
  quantity: number;
}

interface ICartService {
  selectedProducts: CartItem[];
  caculateTotal(): number;
  addToCart(): void;
}

class CartService implements ICartService {
  selectedProducts: CartItem[] = [];
  caculateTotal(): number {
    return this.selectedProducts.reduce(
      (total, item) => item.product.price * item.quantity + total,
      0
    );
  }
  addToCart(): void {
    //@TODO logic here
  }
}

class ProductComponent {
  constructor(public cartService: ICartService) {}
}

const carService = new CartService();
const productComponent = new ProductComponent(carService);

console.log(productComponent);

class MockCartService implements ICartService {
  selectedProducts: CartItem[] = [];
  caculateTotal(): number {
    return 1; //mock data return
  }
  addToCart(): void {
    //@TODO logic here
  }
}

const mockCartService = new MockCartService();
const anotherProductComponentTest = new ProductComponent(mockCartService);
console.log(anotherProductComponentTest.cartService.caculateTotal());
