import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'add-user', component: AddUserComponent },
    {path : '', component : HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
