import { of, merge, fromEvent, interval, BehaviorSubject } from 'rxjs';
import {
  map,
  delay,
  pluck,
  mapTo,
  reduce,
  toArray,
  buffer,
  bufferTime,
  scan,
} from 'rxjs/operators';

const users = [
  {
    id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662',
    username: 'tiepphan',
    firstname: 'tiep',
    lastname: 'phan',
    postCount: 5,
  },
  {
    id: '34784716-019b-4868-86cd-02287e49c2d3',
    username: 'nartc',
    firstname: 'chau',
    lastname: 'tran',
    postCount: 22,
  },
];

const userVm = users.map((user) => {
  return {
    ...user,
    fullname: `${user.firstname} ${user.lastname}`,
  };
});

const observer = {
  next: (value) => console.log(value),
  error: (err) => console.log(err),
  complete: () => console.log('complete'),
};

//map
// of(users)
//   .pipe(
//     map((data) => {
//       console.log('inside map', data);
//       return data;
//     })
//   )
//   .subscribe(observer);

merge(of(users[0]).pipe(delay(2000)), of(users[1]).pipe(delay(4000))).pipe(
  map((user) => ({ ...user, fullname: `${user.firstname} ${user.lastname}` }))
); //.subscribe(observer);

//pluck
const params$ = of({ id: 123, foo: { bar: 'phuong' } });
const id$ = params$.pipe(pluck('foo', 'bar')); //.subscribe(observer);

//mapTo
merge(
  fromEvent(document, 'mouseenter').pipe(mapTo(true)),
  fromEvent(document, 'mouseleave').pipe(mapTo(false))
); //.subscribe(observer);

//reduce
const totalCout$ = merge(
  of(users[0]).pipe(delay(2000)),
  of(users[1]).pipe(delay(4000))
  // interval(1000).pipe(mapTo({ postCount: 1 }))
);

totalCout$.pipe(reduce((acc, cur) => acc + cur.postCount, 0)); //.subscribe(observer);

//toArray
const user$ = merge(
  of(users[0]).pipe(delay(2000)),
  of(users[1]).pipe(delay(4000))
).pipe(toArray()); //.subscribe(observer); // thay toArray bang //pip(reduce((acc, cur) => [...acc, cur], 0)) ta cung co ket qua tuong tu

//buffer
//giup gi lai cac gia tri trong luc dang chạy để rồi lúc kích hoạt nó sẽ show ra hết các giá trị mà bị bỏ qua đó, kiểu nó lưu vào buffer rồi chờ gọi nó sẽ trả về các giá trị đã lưu
const source$ = interval(1000);
const click$ = fromEvent(document, 'click');
source$.pipe(buffer(click$)); //.subscribe(observer);

//bufferTime
source$.pipe(bufferTime(2000)); //.subscribe(observer);

//scan
//giống reduce nhưng thay vè trả về lúc complete thì scan trả về liên tục theo từng pipe mà ko cần complete
totalCout$.pipe(scan((acc, cur) => acc + cur.postCount, 0)); //.subscribe(observer);

//example scan for state managerment
const initialState = {};
const stateSubject = new BehaviorSubject(initialState);
const state$ = stateSubject
  .asObservable()
  .pipe(scan((state, partialState) => ({ ...state, ...partialState }), {}));
state$.subscribe(observer);
stateSubject.next({ name: 'phuong' });
stateSubject.next({ age: 19 });
