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
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
      if(!window.localStorage.getItem('token')) {
          this.userService.logout();
      }
  }
}
