import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/index";
import { UserService } from "../core/user.service";
import { Router } from "@angular/router";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
      this.isLoggedIn$ = this.userService.isLoggedIn;
      this.userService.isLoggedIn.pipe(first()).subscribe(result => {
          if (!result) {
              this.router.navigate(['/login']);
          }
      });
  }
}
