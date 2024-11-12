import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {QuillEditorComponent} from 'ngx-quill';
import {ProductService} from '../../shared/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-page',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    QuillEditorComponent
  ],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.css'
})
export class AddPageComponent implements OnInit {

  form!: FormGroup;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {

    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    })

  }

  submitted: boolean = false;

  submit() {

    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const product = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date(),
    };

    console.log(this.form);
    this.productService.create(product).subscribe(res => {
      this.form.reset();
      this.submitted = false;
      this.router.navigate(['/']);
    });

  }

}
