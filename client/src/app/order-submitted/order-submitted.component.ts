import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../core/order.service';
import { UserService } from '../core/user.service';
import { User } from '../model/user.model';
import { Subscription, from, of  } from 'rxjs';
import { Order } from '../model/order.model';
import { delay } from 'rxjs/internal/operators';
import { concatMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-order-submitted',
  templateUrl: './order-submitted.component.html',
  styleUrls: ['./order-submitted.component.css']
})
export class OrderSubmittedComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentOrder: Order;
    deliveredDuration: number;
    currentUserSubscription: Subscription;
    constructor(private router: Router,
                private userService: UserService, private orderService: OrderService) {
        this.deliveredDuration = 0;
        this.currentUser = this.userService.getCurrentUser;
        this.currentUserSubscription = this.orderService.getCurrentOrder.subscribe(order => {
            this.currentOrder = order;
            if (this.currentOrder.status === 'created') {
                this.deliveredDuration = this.currentOrder.deliveredDuration;
                this.orderService.makePayment(this.currentOrder).subscribe({
                    next: data => {
                        if (data.status === 200) {
                            if (data.result.status === 'confirmed') {
                                this.orderService.setCurrentOrder(data.result);
                            } else {
                                this.orderService.setCurrentOrder(data.result);

                            }
                        } else {
                            alert(data.message);
                        }
                    },
                    error: err => {
                        alert(err.error.message);
                    }
                });
            } else if (this.currentOrder.status === 'canceled') {
                alert('Order is canceled');
                this.router.navigate(['/']);
            } else if (this.currentOrder.status === 'confirmed') {
                alert('Order is confirmed');
                from([2, 2, 2, 4]).pipe(
                    delay( 1000 * 2)
                ).subscribe ( timedItem => {
                    this.orderService.deliveredOrder(this.currentOrder).subscribe({
                        next: data => {
                            this.router.navigate(['/']);
                        },
                        error: err => {
                            alert(err.error.message);
                        }
                    });
                });
            }
        });

    }


    ngOnInit() {
  }
    ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
    cancel() {
        this.router.navigate(['/']);
    }

}
