import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  // Verificar si el usuario es administrador
  if (authService.isUserAdmin()) {
    return true;
  } else {
    // Si no es administrador, redirigir a una ruta específica, como una página de acceso denegado
    return false;
  }
};
