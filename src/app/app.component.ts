import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'record-shop-ui';
  public isLoggedIn = false;

  constructor(private _service: AppService) { }

  ngOnInit() {
    this.isLoggedIn = this._service.checkCredentials();
    let i = window.location.href.indexOf('code');
    if(!this.isLoggedIn && i != -1) {
      this._service.retrieveToken(window.location.href.substring(i + 5));
    }
    console.log(localStorage.getItem('access_token'));
  }

  login() {
    window.location.href =
      `http://localhost:62701/oauth2/authorize?response_type=code&scope=openid%20catalog.read%20cart.write&client_id=${this._service.clientId}&redirect_uri=${this._service.redirectUri}`;
    }

  logout() {
    this._service.revokeToken();
  }
}
