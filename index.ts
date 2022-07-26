import {
  from,
  fromEvent,
  fromEventPattern,
  of,
  interval,
  timer,
  throwError,
  defer,
} from 'rxjs';

const observer = {
  next: (val) => console.log(val),
  error: (err) => console.log(err),
  complete: () => console.log('complete'),
};

//of
of(1, 2, 3, 4, 'hello', 'world', [1, 2, 3, 4, 5], { foo: 'bar' }); //.subscribe( observer );

//form
from('hello world'); //.subscribe(observer);

//formEvent
fromEvent(document, 'click'); //.subscribe(observer);

//formEventPattern
fromEventPattern(
  (handler) => {
    document.addEventListener('click', handler);
  }, //add handler
  (handler) => {
    document.removeEventListener('click', handler);
  } //remove add handler
); //.subscribe(observer);

//interval
interval(1000); //.subscribe(observer);

//timer
timer(10000); //.subscribe(observer);
timer(1000, 1000); //.subscribe(observer);

//throwError
throwError('error').subscribe(observer);

//defer muon retry mot apicall hoan toan moi
//const random$ = Math.random()// neu ko dung defer thi cac gia tri ramdom goi lai phia duoi se luon la mot gia trij giong nhau, thay vi do ta dung nhu phia duoi de ham random luon dc chay moi lan goi
const random$ = defer(() => of(Math.random()));
random$.subscribe(observer);
random$.subscribe(observer);
random$.subscribe(observer);
