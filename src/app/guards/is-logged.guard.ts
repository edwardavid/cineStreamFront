import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.getUser()) {
    return true;
  } else {
    return false;
  }
};
