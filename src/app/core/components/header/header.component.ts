import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

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
      label: 'Log in',
      routerLink: ['/auth/login'],
      id: 'login-nav-link'
    },
    {
      label: 'Register',
      routerLink: ['/auth/register'],
      id: 'register-nav-link'
    }
  ];
  constructor() { }

  ngOnInit(): void {
    this.items = this.unauthenticatedItems;
  }

  logout(): void {

  }

}
