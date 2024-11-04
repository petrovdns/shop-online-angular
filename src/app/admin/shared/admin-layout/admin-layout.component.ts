import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../shared/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

  constructor(
    public auth: AuthService,
    private router: Router,
    ) {}

  logout(event: Event) {
    event.preventDefault();
    this.router.navigate(['/admin', 'login']);
    this.auth.logout();
  }
}
