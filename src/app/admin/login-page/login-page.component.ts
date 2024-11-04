import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../shared/auth.service';
import {User} from '../../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }


  submitted: boolean = false;

  submit() {

    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard'])
        this.submitted = false;
      },
      error: () => {
        this.submitted = false;
      }
    })

  }


}
