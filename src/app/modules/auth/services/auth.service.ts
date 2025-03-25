import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  public sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    }
    return this.httpClient.post(`${this.URL}/auth/login`, body)
      .pipe(
        tap((responseOk: any) => {
          const { tokenSession, data } = responseOk
          this.cookieService.set('token', tokenSession, 4, '/') // 4 días y para toda la aplicación
        })
      )
  }
}
