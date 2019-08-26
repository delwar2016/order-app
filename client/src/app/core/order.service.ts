import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order.model';
import { Observable } from 'rxjs/index';
import { ApiResponse } from '../model/api.response';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class OrderService {

  constructor(private router: Router, private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/api/';
  private orderStatus = new BehaviorSubject<Order>(null);
  createOrder(order: Order): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'order/create', order);
  }
  getOrders(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'orders');
  }
  cancelOrder(order: Order): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + 'order/cancel/' + order.id, order);
  }
  get getOrderStatus() {
    return this.orderStatus.asObservable();
  }
  public setOrderStatus(status) {
    this.orderStatus.next(status);
  }
}
