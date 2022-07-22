// // Import stylesheets
// import './style.css';

// // Write TypeScript code!
// const appDiv: HTMLElement = document.getElementById('app');
// appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;
let someString: string; // string, char
let someNumber: number; // float, douple, int
let someBoolean: boolean; // true, false
let something: any; // any value
let someStringArray: string[]; // tương tự cho number[], boolean[], any[] // Array<string>
let someObject: object;
let someNull: null;
let someUndefine: undefined;
let someUnknown: unknown;
let someNever: never; // vd same throw exception funtion
let someTuple: [string, number]; // array với các vị trí dc định sẵn kiểu dữ liệu
let someVoidFunction: () => void; // một hàm ko trả về giá trị gì sau khi thực thi
let someFunction: () => string; // môt hàm trả về giá trị có type string

//interface vs type
interface User {
  firstName: string;
  lastName: string;
  age?: number; // ? ko phai bat buoc nhap gia tri luc khoi tao
}

// type UserType = {
//   firstName: string;
//   lastName: string;
// };

const user: User = {
  firstName: 'f',
  lastName: 'l',
  age: 25, // co the co hoac ko, ko bat buoc
};

export abstract class BaseService<T> {
  protected model: T;
  find(): T[] {
    return [this.model];
  }
  findOne(): T {
    return this.model;
  }
}

interface Dog {
  bark(): void;
}

interface Cat {
  mew(): void;
}

export class DogService extends BaseService<Dog> {}
export class CatService extends BaseService<Cat> {}

const dogService = new DogService();
const catService = new CatService();

dogService.findOne().bark();
catService.findOne().mew();
