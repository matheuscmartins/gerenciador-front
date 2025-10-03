import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private authService: AuthService, private router: Router){}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  if (!this.authService.isAuthenticated()) {
    this.router.navigate(['login']);
    return false;
  }

  const expectedRoles = route.data['roles'] as Array<string>;
  if (expectedRoles && expectedRoles.length > 0) {
    const hasRole = expectedRoles.some(role => this.authService.hasRole(role));
    if (!hasRole) {
      this.router.navigate(['home']); // ou página de acesso negado
      return false;
    }
  }

  return true;
}

}
