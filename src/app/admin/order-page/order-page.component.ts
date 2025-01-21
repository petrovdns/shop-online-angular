import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrderService} from '../../shared/order.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Orders} from '../../../models/res.model';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent implements OnInit {
  orders: Orders[] = [];
  pSub: Subscription | undefined;
  rSub: Subscription | undefined;

  constructor(protected orderService: OrderService) {}

  ngOnInit(): any {
    this.pSub = this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    })
  }

  ngOnDestroy() {
    if(this.pSub) {
      this.pSub.unsubscribe();
    }

    if(this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.rSub = this.orderService.remove(id).subscribe(()=> {
      this.orders = this.orders.filter(orders => orders.id !== id);
    })
  }
}
