import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './shared/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {AddPageComponent} from './add-page/add-page.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {isAdmin, isAuthenticated} from '../shared/auth.guard';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: 'login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent, canActivate: [isAuthenticated]},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [isAdmin]},
          {path: 'add', component: AddPageComponent, canActivate: [isAdmin]},
          {path: 'orders', component: OrderPageComponent, canActivate: [isAdmin]},
          {path: 'product/:id/edit', component: EditPageComponent, canActivate: [isAdmin]},
        ]
      }
    ])
  ],
  exports: []
})

export class AdminModule {
}
