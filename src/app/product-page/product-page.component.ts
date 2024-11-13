import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { Product } from '../../models/res.model';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    RouterLink,
    QuillViewHTMLComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {

  product$: Observable<Product> | undefined

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe(
        switchMap(params => {
          return this.productService.getById(params['id']);
        })
      );
  }
}
