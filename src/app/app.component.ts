import { Component } from '@angular/core';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'record-shop-ui';
  public isLoggedIn = false;

  constructor(private _service: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this._service.isAuthenticated();
    let i = window.location.href.indexOf('code');
    if(!this.isLoggedIn && i != -1) {
      this._service.retrieveToken(window.location.href.substring(i + 5));
    }
    console.log(localStorage.getItem('access_token'));
  }
}
