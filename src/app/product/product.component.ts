import {Component, Input} from '@angular/core';
import {QuillViewHTMLComponent} from 'ngx-quill';
import {RouterLink} from '@angular/router';
import {Product} from '../../models/res.model';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    QuillViewHTMLComponent,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input() product: any;

  constructor(private productService: ProductService) {}

  addProduct(product: Product) {
    this.productService.addProduct(product);
  }

}
