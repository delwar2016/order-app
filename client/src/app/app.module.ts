import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor} from './core/interceptor';
import { UserService } from './core/user.service';
import { OrderService } from './core/order.service';
import { ApiHealthService } from './core/apiHealth.service';
import { HomeComponent } from './home/home.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ApiHealthComponent } from './api-health/api-health.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderSubmittedComponent } from './order-submitted/order-submitted.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AddUserComponent,
        HomeComponent,
        OrderListComponent,
        ApiHealthComponent,
        AddOrderComponent,
        OrderSubmittedComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [UserService, OrderService, ApiHealthService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule { }
