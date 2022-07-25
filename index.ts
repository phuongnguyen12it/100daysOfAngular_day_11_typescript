import 'reflect-metadata';
import { singleton, scoped, Lifecycle, container } from 'tsyringe';

interface ProductModel {
  sku: string;
  name: string;
  price: number;
}

interface CartItem {
  product: ProductModel;
  quantity: number;
}

@singleton()
class CartService {
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

@scoped(Lifecycle.ResolutionScoped)
class ProductComponent {
  productComponentRandomId = Math.random;
  constructor(public cartService: CartService) {}
}

function testContainer() {
  console.log(container.resolve(ProductComponent));
}

testContainer();
testContainer();
testContainer();
testContainer();

// //test setup
// class TestCarService {
//   selectedProduct: CartItem[] = [];
//   caculateTotal(): number {
//     return this.selectedProduct.reduce(
//       (total, item) => item.product.price * item.quantity + total,
//       0
//     );
//   }
//   addToCart(): void {
//     //@todo logic
//   }
// }

// function setupTestContainer() {
//   container.register('CartService', { useValue: TestCarService });
// }

// setupTestContainer();
// testContainer();
