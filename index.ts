import { asapScheduler, from, fromEvent, interval, timer } from 'rxjs';
import {
  distinct,
  distinctUntilChanged,
  filter,
  find,
  first,
  last,
  single,
  skip,
  skipUntil,
  skipWhile,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  auditTime,
  sampleTime,
  throttleTime,
  pluck,
  debounceTime,
} from 'rxjs/operators';

const items = [1, 2, 3, 4, 5, 6];
const observer = {
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('complete'),
};

//filter
from(items).pipe(filter((x) => x % 2 === 0)); //.subscribe(observer);

//first
from(items).pipe(first((x) => x > 4)); //.subscribe(observer);

//last
from(items).pipe(last((x) => x < 4)); //.subscribe(observer);

//find
from(items).pipe(find((x) => x % 2 !== 0)); //.subscribe(observer);

//single
// su dung khi can duy nhat mot element, neu nhieu hon se bao loi
from(items).pipe(single((x) => x > 5)); //.subscribe(observer);

//take
// muon lay bao nhieu lan gia tri dau vao
interval(1000).pipe(take(10)); //.subscribe(observer);

//takelast
//phai complete(emit) moi lay 2 thang cuoi dc
interval(1000).pipe(take(5), takeLast(2)); //.subscribe(observer);

//takeUntil
interval(1000).pipe(takeUntil(timer(5000))); //  .subscribe(observer);

//taleWile
interval(1000).pipe(takeWhile((x) => x <= 5)); //.subscribe(observer);

//skip
interval(1000).pipe(skip(5)); //.subscribe(observer);

//skipUntil
interval(1000).pipe(skipUntil(timer(6000))); //.subscribe(observer);

//skipWhile
interval(1000).pipe(skipWhile((x) => x < 6)); //.subscribe(observer);

//distinct
//skip cac gia tri trung lap
from([1, 2, 3, 4, 5, 5, 4, 3, 6, 1]).pipe(distinct()); //.subscribe(observer);

//distinUntilChanged
//skip cac gia tri trung lap voi so truoc do
//su dung ===
from([1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4]).pipe(distinctUntilChanged()); //.subscribe(observer);

//distinUntilKeyChanged => same distinUntilChanged

//audit()/auditTime()
// fromEvent(document, 'click')
//   .pipe(
//     auditTime(1500) //interval, timer 1500
//   )
//   .subscribe(observer);
interval(1000).pipe(
  auditTime(1500) //interval, timer 1500
); //.subscribe(observer);
//1s: 0 --> timer(1500) runs
//2s: 1 --> timer con 500ms
//(2.5s): 1 --> timer disabled
//3s: 2 -->timer (1500) runs
//4s: 3 --> timer 500s
//4.5s:4 -->timer disabled
//5s:4 --> timer 1500 runs

//sampleTime # auditTime la no chay lien tuc
interval(1000).pipe(
  sampleTime(1500) //interval, timer 1500
); //.subscribe(observer);

//throttleTime
fromEvent(document, 'mousemove').pipe(
  throttleTime(1500, asapScheduler, { trailing: false, leading: true })
); //.subscribe(observer);

//debounceTime
// cho phep chay emit sau khi ko co phan hoi deboundTime giay
const queryInput = document.querySelector('#queryInput');
fromEvent(queryInput, 'keydown')
  .pipe(debounceTime(1500), pluck('target', 'value'))
  .subscribe(observer);
