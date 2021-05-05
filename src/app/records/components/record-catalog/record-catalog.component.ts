import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CartService } from 'src/app/cart/cart.service';
import { CartItem } from 'src/app/core/model/cart-item';

import {Record} from 'src/app/core/model/record';
import { RecordsSearch } from '../../records-search';
import { RecordsService } from '../../records.service';
import { OrderInfoComponent } from '../order-info/order-info.component';

@Component({
  selector: 'app-record-catalog',
  templateUrl: './record-catalog.component.html',
  styleUrls: ['./record-catalog.component.scss'],
  providers: [DialogService]
})
export class RecordCatalogComponent implements OnInit {

  records: Record[];

  cart: CartItem[];

  cartTotal: number;

  ref: DynamicDialogRef;

  searchForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    artistFirstName: new FormControl(''),
    artistLastName: new FormControl(''),
    genre: new FormControl('')
  });

  constructor(private recordsService: RecordsService, private cartService: CartService, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.recordsService.getRecords({}).subscribe((records) => this.records = records.records);
    this.cartService.cart.subscribe(cart => {
      console.log(cart.length);
      this.cart = cart;
      this.cartTotal = cart.map(cartItem => cartItem.quantity * cartItem.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0.0);
    });
  }

  searchRecords(): void {
    const recordSearch: RecordsSearch = {
      title: this.searchForm.value['title'],
      genre: this.searchForm.value['genre'],
      artistFirstName: this.searchForm.value['artistFirstName'],
      artistLastName: this.searchForm.value['artistLastName']
    };
    this.recordsService.getRecords(recordSearch).subscribe(records => this.records = records.records);
  }

  createOrder(): void {
    this.cartService.createOrder().subscribe((order) => {
      this.ref = this.dialogService.open(OrderInfoComponent, {
        header: 'Order created successfully!',
        width: '70%',
        data: {
          order: order
        }
      });
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
