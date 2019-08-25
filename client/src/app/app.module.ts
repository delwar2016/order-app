import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./core/interceptor";
import {UserService} from "./core/user.service";
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AddUserComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [UserService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule { }
