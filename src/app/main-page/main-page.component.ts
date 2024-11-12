import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Observable} from 'rxjs';
import {AsyncPipe, CommonModule} from '@angular/common';
import {ProductComponent} from '../product/product.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    ProductComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {

  products$: Observable<any[]> | undefined;

  constructor(private productService: ProductService, ) {}

  ngOnInit() {
    this.products$ = this.productService.getAll();
  }

}
