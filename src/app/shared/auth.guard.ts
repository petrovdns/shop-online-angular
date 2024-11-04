import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const isAdmin: CanActivateFn = () => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  } else {
    auth.logout();
    return router.createUrlTree(['/admin', 'login']);
  }
};

export const isAuthenticated: CanActivateFn = () => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (auth.isAuthenticated()) {
    return router.createUrlTree(['/admin', 'dashboard']);
  } else {
    router.createUrlTree(['/admin', 'login']);
    return true;
  }
};
