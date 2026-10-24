import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../../../config/routes.config';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated()
    ? true
    : router.createUrlTree([APP_ROUTES.login]);
};
