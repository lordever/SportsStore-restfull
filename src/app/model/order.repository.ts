import {Injectable} from "@angular/core";
import {Order} from "./order.model";
import {Observable} from "rxjs/Observable";
import {RestDatasource} from "./rest.datasource";

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];
  private loaded: boolean = false;

  constructor(private dataSource: RestDatasource) {
  }

  loadOrders(){
    this.loaded = true;
    this.dataSource.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  getOrders(): Order[] {
    if(!this.loaded){
      this.loadOrders();
    }
    return this.orders;
  }

  saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }

  updateOrder(order: Order){
    this.dataSource.updateOrder(order).subscribe((forEachOrder) => {
      this.orders.splice(this.orders.findIndex(o => o.id == forEachOrder.id), 1, order);
    });
  }

  deleteOrder(id: number){
    this.dataSource.deleteOrder(id).subscribe((forEachOrder) => {
      this.orders.splice(this.orders.findIndex((o) => o.id == forEachOrder.id));
    })
  }
}
