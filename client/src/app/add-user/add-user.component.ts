import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../core/user.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

    addForm: FormGroup;

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            id: [],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

    }

    onSubmit() {
        this.userService.createUser(this.addForm.value)
            .subscribe( data => {
                this.router.navigate(['/']);
            });
    }
    cancel() {
        this.router.navigate(['login']);
    }

}
