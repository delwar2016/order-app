import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../core/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    invalidLogin = false;
    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        const loginPayload = {
            username: this.loginForm.controls.username.value,
            password: this.loginForm.controls.password.value
        };
        this.userService.login(loginPayload).subscribe({
            next: data => {
                if (data.status === 200) {
                    this.userService.LoggedInData(true);
                    this.userService.setCurrentUser(data.result.user);
                    window.localStorage.setItem('token', data.result.token);
                    this.router.navigate(['/']);
                } else {
                    this.userService.LoggedInData(false);
                    this.invalidLogin = true;
                    alert(data.message);
                }
            },
            error: (err) => {
                alert(err.error.message);
            }
        });
    }
    addUser(): void {
        this.router.navigate(['add-user']);
    }
    ngOnInit() {
        this.userService.LoggedInData(false);
        window.localStorage.removeItem('token');
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.required]
        });
    }

}
