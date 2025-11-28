import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    
    const expectedRoles = route.data['roles'] as Array<string>;

    if (expectedRoles && expectedRoles.length > 0) {
      const hasPermission = this.authService.hasAnyRole(expectedRoles);
      if (!hasPermission) {
        this.router.navigate(['home']); // ou uma rota de "acesso negado"
        return false;
      }
    }
    
    return true;
  }
}
