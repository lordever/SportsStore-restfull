import {Component} from '@angular/core';
import {OrderRepository} from "../model/order.repository";
import {Order} from "../model/order.model";
import {NgForm} from "@angular/forms";

@Component({
  moduleId: module.id,
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.css']
})
export class CheckoutComponent {
  orderSent: boolean = false;
  submited: boolean = false;

  constructor(public orderRepository: OrderRepository,
              public order: Order) {
  }

  submitOrder(form: NgForm) {
    this.submited = true;
    if (form.valid) {
      this.orderRepository.saveOrder(this.order).subscribe((order) => {
        order.clear();
        this.submited = false;
        this.orderSent = true;
      });
    }
  }
}
