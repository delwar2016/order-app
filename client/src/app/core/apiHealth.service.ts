import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { ApiResponse } from '../model/api.response';

@Injectable()
export class ApiHealthService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/api/';
  getStats(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'stats');
  }
}
