import { iif, of, throwError } from 'rxjs';
import {
  catchError,
  map,
  retry,
  take,
  delay,
  defaultIfEmpty,
  throwIfEmpty,
  every,
} from 'rxjs/operators';

const observer = {
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('complete'),
};

const handleError = () => {
  console.log(`
    --------------------------------------------
    I am handling the error. Alerting the users
    --------------------------------------------
  `);
};

//catchError
const obs = throwError('i am an error').pipe(
  catchError((err, caught) => {
    handleError();
    return of('default value');
  })
); //.subscribe(observer);

throwError('ugly error').pipe(
  catchError((err) => {
    handleError();
    const beatyError = new Error('this is a freindlier error');
    return throwError(beatyError);
  })
); //.subscribe(observer);

const cached = [4, 5];
of(1, 2, 3, 4, 5).pipe(
  map((n) => {
    if (cached.includes(n)) {
      throw new Error('Duplicated: ' + n);
    }
    return n;
  }),
  catchError((err, caught) => caught),
  take(5)
); //.subscribe(observer);

of(1, 2, 3, 4, 5).pipe(
  map((n) => {
    if (cached.includes(n)) {
      throw new Error('Duplicated: ' + n);
    }
    return n;
  }),
  catchError((err, caught) => caught),
  retry(2)
); //.subscribe(observer);

//conditional

of().pipe(delay(3000), defaultIfEmpty('default value')); //.subscribe(observer);
of().pipe(
  delay(3000),
  throwIfEmpty(() => 'error empty')
); //.subscribe(observer);

//every
of(1, 2, 3, 4, 5, 6).pipe(every((x) => x > 0)); //.subscribe(observer);

//iif => const obs = condition ? trueObs : falseObs;
const userId = 123;

function updateObservable() {
  return of('update');
}

function createObservable() {
  return of('create');
}

iif(() => userId != null, updateObservable(), createObservable()).subscribe(
  observer
);
