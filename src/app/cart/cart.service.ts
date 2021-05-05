import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItem } from '../core/model/cart-item';
import { Order } from '../core/model/order';
import { OrderRequest } from '../core/model/order-request';
import { Record } from '../core/model/record';
import { ArtistListPipe } from '../shared/pipes/artist-list.pipe';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private ordersUrl: string = '/api/orders';

  private cartItems: CartItem[];
  private cartSubject: BehaviorSubject<CartItem[]>;
  public cart: Observable<CartItem[]>;

  constructor(private artistListPipe: ArtistListPipe, private http: HttpClient) {
    this.cartItems = this.loadCart();
    this.cartSubject = new BehaviorSubject(this.cartItems);
    this.cart = this.cartSubject.asObservable();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCart(): CartItem[] {
    const localCart = localStorage.getItem('cart');
    if (!localCart)
      return [];
    return JSON.parse(localCart);
  }

  createOrder(): Observable<Order> {
    const request: OrderRequest = {
      itemsRequest: this.cartItems.map(cartItem => {
        return {
          recordId: cartItem.id,
          count: cartItem.quantity
        };
      })
    };
    return this.http.post<Order>(this.ordersUrl, request).pipe(
      tap(order => {
        this.clearCart();
      })
    );

    const order: Order = {
      id: 1,
      items: this.cartItems.map(item => {
        return {
          recordId: item.id,
          count: item.quantity,
          price: item.price
        };
      }),
      priceSum: this.cartItems.map(item => item.quantity * item.price).reduce((accumulator, current) => accumulator + current, 0.0)
    };
    this.clearCart();
    return of(order);
  }

  addToCart(record: Record): void {
    let cartItem: CartItem = this.cartItems.find(cartItem => cartItem.id === record.id);
    console.log(cartItem);
    if (cartItem === undefined) {
      cartItem = {
        id: record.id,
        title: record.title,
        artists: this.artistListPipe.transform(record.artists),
        price: record.price,
        quantity: 0
      };
      this.cartItems.push(cartItem);
    }
    cartItem.quantity++;
    this.saveCart();
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(recordId: number) {
    const idx = this.cartItems.findIndex(cartItem => cartItem.id === recordId);
    this.cartItems.splice(idx, 1);
    this.saveCart();
    this.cartSubject.next(this.cartItems);
  }

  increaseQuantity(recordId: number) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id === recordId);
    cartItem.quantity++;
    this.saveCart();
    this.cartSubject.next(this.cartItems);
  }

  decreaseQuantity(recordId: number) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id === recordId);
    cartItem.quantity--;
    this.saveCart();
    this.cartSubject.next(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
    this.cartSubject.next(this.cartItems);
  }
}

