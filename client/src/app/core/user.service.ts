import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../model/api.response";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3000/';

  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:3000/' + 'user/authenticate', loginPayload);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:3000/' + 'user/register', user);
  }
}