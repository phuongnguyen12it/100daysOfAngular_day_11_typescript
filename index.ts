import { BehaviorSubject, of, ReplaySubject, Subject, timer } from 'rxjs';
import { finalize, switchMapTo } from 'rxjs/operators';

//Subject
const createObserver = (observer) => ({
  next: (val) => console.log(observer, val),
  error: (err) => console.error(observer, err),
  complete: () => console.log(observer, 'complete'),
});

// const subject = new Subject();

// subject.subscribe(createObserver('A'));
// subject.next('hello');
// subject.next('world');

// subject.subscribe(createObserver('B'));
// subject.next('this will be received by both A and B');

//behavorSubject
// const loadingSubject = new Subject();
// function getUsers() {
//   loadingSubject.next(true);
//   return timer(3000).pipe(
//     switchMapTo(of('user')),
//     finalize(() => {
//       loadingSubject.next(false);
//     })
//   );
// }
// loadingSubject.subscribe(createObserver('Component'));
// getUsers().subscribe();
// const behaviorSubject = new BehaviorSubject('hello');
// behaviorSubject.subscribe(createObserver('A'));

//replaySubject
const replaySubject = new ReplaySubject(2, )