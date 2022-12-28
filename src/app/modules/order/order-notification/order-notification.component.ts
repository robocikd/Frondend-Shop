import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { S } from 'chart.js/dist/chunks/helpers.core';
import { interval, mergeMap, takeUntil, takeWhile, timer } from 'rxjs';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-notification',
  templateUrl: './order-notification.component.html',
  styleUrls: ['./order-notification.component.scss']
})
export class OrderNotificationComponent implements OnInit {
  status = false;
  constructor(private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStatus();
  }
  getStatus() {
    let hash = this.route.snapshot.params['orderHash'];
    this.orderService.getStatus(hash)
      .subscribe(status => {
        this.status = status.paid;
        if (this.status === false) {
          interval(9000).pipe(
            mergeMap(() => this.orderService.getStatus(hash))
            , takeUntil(timer(5 * 60 * 1000)),
            takeWhile(value => value.paid === false, true)
          ).subscribe(status => this.status = status.paid);
        }
      });
  }
}
