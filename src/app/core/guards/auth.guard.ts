import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentRole = this.authenticationService.currentRoleValue;
    const routerRoles = route.data.roles.map(r => r.toString());
    if (currentRole) {
      if (route.data.roles && routerRoles.indexOf(currentRole) === -1) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
