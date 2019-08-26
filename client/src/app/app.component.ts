import { Component, OnInit} from '@angular/core';
import { Observable } from "rxjs/index";
import { UserService } from "./core/user.service";
import { Router } from "@angular/router";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Order App';
    isLoggedIn$: Observable<boolean>;

    constructor(private router: Router, private userService: UserService) {
    }

    async ngOnInit() {
        this.isLoggedIn$ = this.userService.isLoggedIn;
        this.userService.isLoggedIn.pipe(first()).subscribe(result => {
            if (!result) {
                this.router.navigate(['/login']);
            }
        });
    }

    onLogout(){
        this.userService.logout();
    }
}
