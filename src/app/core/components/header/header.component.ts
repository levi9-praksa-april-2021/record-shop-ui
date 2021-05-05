import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];

  authenticated: boolean;

  commonItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: [''],
      id: 'home-nav-link'
    }
  ];

  userItems: MenuItem[] = [
    {
      label: 'Catalog',
      routerLink: ['/records/catalog'],
      id: 'catalog-nav-link'
    }
  ];

  adminItems: MenuItem[] = [
    {
      label: 'Records',
      routerLink: ['/records'],
      id: 'records-nav-link'
    },
    {
      label: 'Artists',
      routerLink: ['/artists'],
      id: 'artists-nav-link'
    },
    {
      label: 'Genres',
      routerLink: ['/genres'],
      id: 'genres-nav-link'
    },
  ];

  unauthenticatedItems: MenuItem[] = [
    {
      label: 'Register',
      routerLink: ['/auth/register'],
      id: 'register-nav-link'
    }
  ];

  constructor(private authenticationService: AuthService) { }

  ngOnInit(): void {
    this.authenticationService.currentRole.subscribe(role => this.updateItems(role));
  }

  updateItems(role: string): void {
    if (!!role) {
      this.authenticated = true;
      if (role === 'ROLE_ADMIN') {
        this.items = [
          ...this.commonItems,
          ...this.adminItems
        ];
      }
      else if (role === 'ROLE_USER') {
        this.items = [
          ...this.commonItems,
          ...this.userItems
        ];
      }
    }
    else {
      this.authenticated = false;
      this.items = [
        ...this.commonItems,
        ...this.unauthenticatedItems
      ];
    }
  }

  login(): void {
    window.location.href =
      `http://localhost:9000/oauth2/authorize?response_type=code&scope=openid%20catalog.read%20cart.write%20catalog.write&client_id=${this.authenticationService.clientId}&redirect_uri=${this.authenticationService.redirectUri}`;
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
