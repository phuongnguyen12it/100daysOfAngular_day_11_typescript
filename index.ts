import {
  forkJoin,
  of,
  delay,
  combineLatest,
  interval,
  map,
  zip,
  concat,
  merge,
  fromEvent,
  from,
  race,
  Observable,
} from 'rxjs';
import {
  catchError,
  endWith,
  pairwise,
  startWith,
  take,
  withLatestFrom,
} from 'rxjs/operators';

const observer = {
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('complete'),
};

//forkJoin()
forkJoin([
  of('hello').pipe(delay(1000)),
  of('work').pipe(delay(2000)),
  of('!!!').pipe(delay(3000)),
]); //.subscribe(observer);

//combielatest
// chỉ vần một emit trả về thì combibeLatest sẽ bắt và return các giá trị của các emit khác kể cả có và ko có(thường là các giá trị trước đó của emit, nếu ko có thì trả về empty|0)
combineLatest([
  interval(2000).pipe(map((x) => `First: ${x}`)),
  interval(1000).pipe(map((x) => `Second: ${x}`)),
  interval(3000).pipe(map((x) => `Thỉrd: ${x}`)),
]); //.subscribe(observer);

//zip
//combineLatest(of(1, 2, 3), of(4, 5, 6), of(7, 8, 9)).subscribe(observer);
zip(of(1, 2, 3), of(4, 5, 6), of(7, 8, 9)); //.subscribe(observer);
const age$ = of(29, 28, 30);
const name$ = of('A', 'B', 'C');
const isAdmin$ = of(true, true, false);

zip(age$, name$, isAdmin$).pipe(
  map(([age, name, isAdmin]) => ({ age, name, isAdmin }))
); //.subscribe(observer);

zip(fromEvent(document, 'mousedown'), fromEvent(document, 'mouseup')); //.subscribe(observer);

//concat => cho thang truoc chay xong het moi den thang sau
concat(interval(1000).pipe(take(3)), interval(500).pipe(take(5))); //.subscribe(observer);

//merge => mổi thàng chạy lần lượt theo time, thằng nào emit trước chạy trước, ko cần chờ thằng trước chạy xong chi cả
merge(
  interval(1000).pipe(
    take(3),
    map((x) => `first ${x}`)
  ),
  interval(500).pipe(
    take(5),
    map((x) => `second ${x}`)
  )
); //.subscribe(observer);

//race => thằng nào emit trươc thì trả về bỏ qua thằng emit chậm hơn
//nghiệp vụ thường được dùng cho ...
race(
  interval(1000).pipe(
    take(3),
    map((x) => `first ${x}`)
  ),
  interval(500).pipe(
    take(5),
    map((x) => `second ${x}`)
  )
); //.subscribe(observer);

//withLatestFrom => giong combineLatest nhung thay vi lay het cai truoc do thì chỉ lấy cái phía trước mà sát nó nhất
const withLatestFrom$ = interval(2000).pipe(
  map((x) => `Need latest from this value: ${x}`)
);
fromEvent(document, 'click').pipe(withLatestFrom(withLatestFrom$)); //  .subscribe(observer);

// startWith
of('world').pipe(startWith('hello')); //.subscribe(observer); // =>

interface ApiResponse<T> {
  data: T;
  isLoading: boolean;
  error: string;
}

function getApiResonse<T>(apiCall: Observable<T>): Observable<ApiResponse<T>> {
  return apiCall.pipe(
    map((data) => ({ isLoading: false, data, error: '' })),
    startWith({ isLoading: true, data: null, error: '' }),
    catchError((err) =>
      of({ isLoading: false, data: null, error: err.message })
    )
  );
}

// endWith
of('hello').pipe(endWith('end')); //.subscribe(observer);

//pairwise
from([1, 2, 3, 4, 5])
  .pipe(
    pairwise(),
    map(([prev, cur]) => prev + cur)
  )
  .subscribe(observer);
