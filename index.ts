import { fromEvent, interval, of } from 'rxjs';
import { map, mergeAll, take } from 'rxjs/operators';

//Observable<number>
//Observable<string>
interval(1000) //Outer Observeble (parent Observable)
  .pipe(map((val) => `I am at: ${val}`));
//.subscribe(console.log);

//map value to Observable
const hoo = fromEvent(document, 'click') //Outer Observable (parent Observable)
  .pipe(
    map((val) => interval(1000).pipe(take(5))),
    mergeAll(1)
  ); //Inner Observerble (Child Observable)

//mergeAll()
//swithAll()
//concatAll()
// hoo.subscribe((obs) => {
//   obs.subscribe(console.log); //bab subscribe in subscribe
// });

// hoo.subscribe(console.log);

//mergeMap() = mergeAll() + map() //subscribe vao ca 3
//swichMap() = switchAll() + map() // dg subscribe vao cai dau tien, ma co observebale thu 2 cancle cai dau tien subscribe vao cai thu 2, luon chi co 1 observable vao 1 thoi diem => thich họp cho cancel xhr request
//concatMap() = concatAll() + map() subscribe theo thứ tự, complete cai 1 mới sang cái 2 và cứ thế tới cái cuối cùng
//exhaustMap() //trong lúc dg subscrible mà có obsevebal thì đều bị cancle,
