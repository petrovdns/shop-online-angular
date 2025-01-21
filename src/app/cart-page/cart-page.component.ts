import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../../models/res.model';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderService} from '../shared/order.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  cartProducts: Product[] = [];
  totalPrice = 0;

  constructor(private productService: ProductService, private router: Router, private orderService: OrderService) {}

  ngOnInit() {
    this.cartProducts = this.productService.cartProducts;
    if (this.cartProducts.length > 0) {
      for (let i = 0; i < this.cartProducts.length; i++) {
        this.totalPrice += +this.cartProducts[i].price!;
      }
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    });

  }

  submit() {

    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const order = {
      name: this.form.value.name,
      address: this.form.value.address,
      phone: this.form.value.phone,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date(),
    };

    this.orderService.create(order).subscribe(() => {
      this.form.reset();
      this.submitted = false;
    });

  }

  removeProduct(price: string, id: string) {
    this.totalPrice -= +price;
    this.cartProducts = this.cartProducts.filter(product => product.id !== id);
    this.productService.cartProducts = this.productService.cartProducts.filter(product => product.id !== id);
  }
}
