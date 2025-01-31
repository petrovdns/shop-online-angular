import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Product} from '../../../models/res.model';
import {Subscription} from 'rxjs';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SearchPipe} from '../../shared/search.pipe';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    SearchPipe
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {

  products: Product[] = [];
  pSub: Subscription | undefined;
  rSub: Subscription | undefined;
  productName: string = '';

  constructor(protected productService: ProductService) {}

  ngOnInit(): any {
    this.pSub = this.productService.getAll().subscribe(products => {
      this.products = products;
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
    this.rSub = this.productService.remove(id).subscribe(()=> {
      this.products = this.products.filter(product => product.id !== id);
    })
  }
}
