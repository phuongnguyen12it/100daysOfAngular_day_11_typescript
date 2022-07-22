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

// dogService.findOne().bark();
// catService.findOne().mew();

//day 12

function listen(port: unknown) {
  if (typeof port === 'string') {
    port = parseInt(port);
  }
  //@TODO somthing
}

let port: unknown;

//Exclude & Extract
interface Car {
  color: string;
  series: string;
  patNumber?: string;
}

type carNotPatNumber = Exclude<keyof Car, 'patNumber'>; //=> carNotPatNumber{color:string, series:string}
type carExtract = Extract<keyof Car, 'patNumber'>;

const readOnlyCar: Readonly<Car> = {
  //reonly atrribute cannot update
  color: 'red',
  series: '123',
  patNumber: '1122',
};

const partialUser: Partial<Car> = {
  color: 'red',
};

const nullableUser: NonNullable<Car> = {
  color: null,
  series: null,
  patNumber: null,
};

const requiredCar: Required<Car> = {
  color: 'green',
  series: '1231',
  patNumber: '11233',
};

const pickCar: Pick<Car, 'series' | 'patNumber'> = {
  series: '1233',
};
