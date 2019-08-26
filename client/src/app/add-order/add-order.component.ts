import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { OrderService } from "../core/order.service";
import { UserService } from "../core/user.service";
import { User } from "../model/user.model";
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
    currentUser: User;
    currentUserSubscription: Subscription;
    constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService, private orderService: OrderService) {
        this.currentUser = this.userService.getCurrentUser;
    }

    addForm: FormGroup;

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            delivery_address: ['', Validators.required],
            phone_number: ['', Validators.required],
            item_detail: ['', Validators.required],
            price: ['', Validators.required],
            card_holder_name: ['', Validators.required],
            card_number: ['', Validators.required]
        });

    }

    onSubmit() {
        this.orderService.createOrder(this.addForm.value)
            .subscribe({
                next: data => {
                    if(data.status === 200) {
                        this.orderService.setOrderStatus(data.result);
                    } else {
                        alert(data.message);
                    }
                },
                error: err => {
                    alert(err.error.message)
                }
            });
    }
    cancel() {
        this.router.navigate(['/']);
    }

}