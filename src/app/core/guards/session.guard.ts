import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkSessionCookie();
  }

  checkSessionCookie(): boolean {
    try {
      const token: boolean = this.cookieService.check('token')

      if(!token) {
        this.router.navigateByUrl('/auth/login')
      }
      
      return token
    } catch (error) {
      console.log('Error: ', error);

      return false
    }
  }
  
}
