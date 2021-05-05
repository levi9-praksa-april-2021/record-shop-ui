import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';
import { RegisterRequest } from './register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public clientId = 'record-shop-client';
  public redirectUri = 'http://localhost:4200/';

  authenticationUrl = `/api`;

  private currentRoleSubject: BehaviorSubject<string>;
  public currentRole: Observable<string>;

  private getRoleFromLocalStorage(): string {
    function parseJwt(token) {
      // var base64Payload = token.split('.')[1];
      // var payload = Buffer.from(base64Payload, 'base64');
      // return JSON.parse(payload.toString());
      return jwt_decode(token);
    }
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null;
    }
    const payload = parseJwt(token);
    console.log(payload);
    return payload['roles'][0];
  }

  constructor(private http: HttpClient, private router: Router) {
    this.currentRoleSubject = new BehaviorSubject<string>(this.getRoleFromLocalStorage());
    this.currentRole = this.currentRoleSubject.asObservable();
  }

  public get currentRoleValue(): string {
    return this.currentRoleSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentRoleSubject.value != null;
  }

  retrieveToken(code) {
    let params = new URLSearchParams();
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('client_secret', 'record-shop-secret');
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);

    let headers =
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

      this.http.post('/oauth2/token',
        params.toString(), { headers: headers })
        .subscribe(
          data => {

            this.saveToken(data)
          },
          err => console.log(err));
  }

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem("access_token", token.access_token);
    console.log('Obtained Access token');
    window.location.href = 'http://localhost:4200';
  }

  logout(): void {
    var token = localStorage.getItem('access_token');
    let params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('client_secret', 'record-shop-secret');
    params.append('token', token);
    let headers =
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

    this.http.post(`${this.authenticationUrl}/oauth2/revoke`,
      params.toString(), { headers: headers })
      .subscribe(
        data => {
          localStorage.removeItem('access_token');
          this.currentRoleSubject.next(null);
          this.router.navigate(['']);
        },
        err => console.log(err));
  }

  register(registerRequest: RegisterRequest): Observable<void> {
    const url = `${this.authenticationUrl}/users`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<void>(url, registerRequest, httpOptions);
  }
}
