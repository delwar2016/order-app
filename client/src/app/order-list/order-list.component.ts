import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../model/order.model';
import { OrderService } from '../core/order.service';
import { _ } from 'underscore';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[];
  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
      this.orderService.getOrders()
          .subscribe({
              next: data => {
                  if (data.status === 200) {
                      this.orders = data.result;
                  } else {
                      alert(data.message);
                  }
              },
              error: err => {
                  alert(err.error.message);
              }
          });
  }

  cancelOrder(order: Order): void {
      this.orderService.cancelOrder(order)
          .subscribe({
              next: data => {
                  if (data.status === 200) {
                      const sourceOrder = _.find(this.orders, o => o._id === order._id);
                      sourceOrder.status = data.result.status;
                  } else {
                      alert(data.message);
                  }
              },
              error: err => {
                  alert(err.error.message);
              }
          });
  }

}
