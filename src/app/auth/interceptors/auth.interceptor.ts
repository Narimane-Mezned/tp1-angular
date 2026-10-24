import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).user()?.token;
  if (!token) {
    return next(request);
  }
  return next(request.clone({ setHeaders: { Authorization: token } }));
};
