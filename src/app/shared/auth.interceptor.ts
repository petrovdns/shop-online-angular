import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const path = new URL(req.url).pathname;

    if (path.includes("products.json")) {

      if (this.authService.isAuthenticated() && this.authService.token) {
        req = req.clone({
          setParams: {
            auth: this.authService.token
          }
        })
      }

      return next.handle(req)
        .pipe(
          catchError(err => {
            if (err.status === 401) {
              this.authService.logout()
              this.router.navigate(['/admin', 'login'], {skipLocationChange: true})
            }
            return throwError(err)
          }))
    } else {
      return next.handle(req);
    }
  }
}
