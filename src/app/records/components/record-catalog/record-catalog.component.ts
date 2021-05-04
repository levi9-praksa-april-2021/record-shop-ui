import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { CartItem } from 'src/app/core/model/cart-item';

import {Record} from 'src/app/core/model/record';
import { RecordsService } from '../../records.service';

@Component({
  selector: 'app-record-catalog',
  templateUrl: './record-catalog.component.html',
  styleUrls: ['./record-catalog.component.scss']
})
export class RecordCatalogComponent implements OnInit {

  records: Record[];

  cart: CartItem[];

  cartTotal: number;

  constructor(private recordsService: RecordsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.recordsService.getRecords().subscribe((records) => this.records = records);
    this.cartService.cart.subscribe(cart => {
      console.log(cart.length);
      this.cart = cart;
      this.cartTotal = cart.map(cartItem => cartItem.quantity * cartItem.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0.0);
    });
  }

  addToCart(record: Record): void {
    this.cartService.addToCart(record);
  }

  removeFromCart(recordId: number): void {
    this.cartService.removeFromCart(recordId);
  }

  increaseQuantity(recordId: number): void {
    this.cartService.increaseQuantity(recordId);
  }

  decreaseQuantity(recordId: number): void {
    this.cartService.decreaseQuantity(recordId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

}
