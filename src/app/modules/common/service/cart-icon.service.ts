import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartIconService {
  subjectIcon: Subject<Number> = new Subject();
  constructor() {}

  cartChange(counter: number) {
    this.subjectIcon.next(counter);
  }
}
