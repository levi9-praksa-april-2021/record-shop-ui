import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public clientId = 'record-shop-client';
  public redirectUri = 'http://localhost:4200/';

  constructor(private _http: HttpClient) { }

  retrieveToken(code) {
    let params = new URLSearchParams();
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('client_secret', 'record-shop-secret');
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);

    let headers =
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

      this._http.post('/oauth2/token',
        params.toString(), { headers: headers })
        .subscribe(
          data => this.saveToken(data),
          err => console.log(err));
  }

  revokeToken() {
    var token = localStorage.getItem('access_token');
    let params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('client_secret', 'record-shop-secret');
    params.append('token', token);
    let headers =
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

      this._http.post('/oauth2/revoke',
        params.toString(), { headers: headers })
        .subscribe(
          data => {
            localStorage.removeItem('access_token');
            window.location.reload();
          },
          err => console.log(err));
  }

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem("access_token", token.access_token);
    console.log('Obtained Access token');
    window.location.href = 'http://localhost:4200';
  }

  getResource(resourceUrl) : Observable<any> {
    var headers = new HttpHeaders({
      'Authorization': 'Bearer '+ localStorage.getItem('access_token')});
    return this._http.get(resourceUrl, { headers: headers });
  }

  checkCredentials() {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    this.revokeToken();
  }
}
