import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../model/user.model";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../model/api.response";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  constructor(private router: Router, private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3000/user/';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<User>(null);
  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'authenticate', loginPayload);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'register', user);
  }
  get getCurrentUser() {
      return this.currentUser.asObservable();
  }
  public setCurrentUser(user) {
    this.currentUser.next(user);
  }
  get isLoggedIn() {
      return this.loggedIn.asObservable();
  }
  public LoggedInData(status) {
      this.loggedIn.next(status);
  }
  logout() {
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
  }
}