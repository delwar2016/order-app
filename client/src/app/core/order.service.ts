import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order.model';
import { BehaviorSubject, Observable  } from 'rxjs/index';
import { expand  } from 'rxjs/operators';
import { ApiResponse } from '../model/api.response';
import { Router } from '@angular/router';

@Injectable()
export class OrderService {

  private currentOrder: BehaviorSubject<Order>;
  constructor(private router: Router, private http: HttpClient) {
  }
  baseUrl = 'http://localhost:3000/api/';
  createOrder(order: Order): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'order/create', order);
  }
  get getCurrentOrder() {
    return this.currentOrder.asObservable();
  }
  getOrders(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'orders');
  }
  public setCurrentOrder(order) {
      if (!this.currentOrder) {
          this.currentOrder = new BehaviorSubject<Order>(order);
      } else  {
          this.currentOrder.next(order);
      }
  }
  makePayment(order: Order): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'order/payment', order);
  }
  cancelOrder(order: Order): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + 'order/cancel/' + order.id, order);
  }
  deliveredOrder(order: Order): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + 'order/delivered/' + order.id, order);
  }
}
