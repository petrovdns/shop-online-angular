import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './shared/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {AddPageComponent} from './add-page/add-page.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path:'', redirectTo: 'login', pathMatch: 'full'},
          {path:'login', component: LoginPageComponent},
          {path:'dashboard', component: DashboardPageComponent},
          {path:'add', component: AddPageComponent},
          {path:'orders', component: OrderPageComponent},
          {path:'product/:id/edit', component: EditPageComponent},
        ]
      }
    ])
  ],
  exports: []
})

export class AdminModule {}
