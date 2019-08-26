import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { HomeComponent } from "./home/home.component";
import { AddOrderComponent } from "./add-order/add-order.component";
import { OrderListComponent } from "./order-list/order-list.component";
import { ApiHealthComponent } from "./api-health/api-health.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'add-order', component: AddOrderComponent },
    { path: 'order-list', component: OrderListComponent },
    { path: 'api-health', component: ApiHealthComponent },
    {path : '', component : OrderListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
