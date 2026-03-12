import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const request = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token expired or invalid - redirect to login
        localStorage.removeItem('token');
        router.navigate(['/login']);
      } else if (error.status === 403) {
        router.navigate(['/dashboard']);
      } else if (error.status === 0) {
        console.error('Network error: Backend not reachable');
      }

      return throwError(() => error);
    })
  );
}
