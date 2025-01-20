import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {QuillEditorComponent} from 'ngx-quill';
import {ProductService} from '../../shared/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../models/res.model';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    QuillEditorComponent
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent implements OnInit {

  form!: FormGroup;
  submited: boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    })

    this.getProductData();

  }

  getProductData() {
    this.productService.getById(this.route.snapshot.paramMap.get('id')!).subscribe({
      next: (product: Product) => {
        this.form.patchValue({
          type: product.type,
          title: product.title,
          photo: product.photo,
          info: product.info,
          price: product.price
        })
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  updateProduct(): void {
    this.submited = true;
    this.productService.update({
      id: this.route.snapshot.paramMap.get('id')!,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date(),
    }).subscribe({
      next: () => this.router.navigate(['/admin', 'dashboard'])
    });
  }

}
