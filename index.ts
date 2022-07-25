import { fromEvent, Observable } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';

// const rate = 1000;
// let lastMove = Date.now() - rate;

// document.addEventListener('mousemove', (ev) => {
//   if (Date.now() - lastMove >= rate) {
//     console.log(ev);
//     lastMove = Date.now();
//   }
// });

//RxJS
// fromEvent(document, 'mousemove')
//   .pipe(
//     throttleTime(1000),
//     map((ev: MouseEvent) => ev.clientX + ' ' + ev.clientY)
//   )
//   .subscribe(console.log);

const observable = new Observable(function subscribe(observer) {
  const id = setInterval(() => {
    observer.next('Hello Txjs');
  }, 1000);
  return function unsubscribe() {
    clearTimeout(id);
  };
});

// observable.subscribe(
//   (val) => console.log(val),
//   (err) => console.error(err),
//   () => console.log('complete')
// );

const subscription = observable.subscribe({
  next: (val) => console.log(val),
  error: (err) => console.log(err),
  complete: () => console.log('complete 000'),
});

setTimeout(() => {
  subscription.unsubscribe();
}, 10000);
