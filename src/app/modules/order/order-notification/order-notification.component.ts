import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      .subscribe(status => this.status = status.paid);
  }

}
