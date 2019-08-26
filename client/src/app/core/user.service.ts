import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable } from 'rxjs/index';
import { ApiResponse } from '../model/api.response';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  constructor(private router: Router, private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/user/';
  private loggedIn = new BehaviorSubject<boolean>(false);
  login(loginPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'authenticate', loginPayload);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'register', user);
  }
  get getCurrentUser() {
    const currentUser = window.localStorage.getItem('currentUser');
    return JSON.parse(currentUser);
  }
  public setCurrentUser(user) {
      window.localStorage.setItem('currentUser', JSON.stringify(user));
  }
  get isLoggedIn() {
      return this.loggedIn.asObservable();
  }
  public LoggedInData(status) {
      this.loggedIn.next(status);
  }
  logout() {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('currentUser');
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
  }
}
