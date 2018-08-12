import {Component} from "@angular/core";
import {OrderRepository} from "../model/order.repository";
import {Order} from "../model/order.model";

@Component({
  moduleId: module.id,
  templateUrl: "orderTable.component.html"
})
export class OrderTableComponent {
  includeSnipped: boolean = false;

  constructor(private repository: OrderRepository) {
  }

  getOrders(): Order[] {
    return this.repository.getOrders().filter((order) => this.includeSnipped || !order.snipped);
  }

  markShipped(order: Order){
    order.snipped = true;
    this.repository.updateOrder(order);
  }

  delete(id: number){
    this.repository.deleteOrder(id);
  }
}

