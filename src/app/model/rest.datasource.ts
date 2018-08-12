import {Injectable} from "@angular/core";
import {RequestMethod, Http, Request} from "@angular/http";
import {Product} from "./product.model";
import {Order} from "./order.model";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

const PROTOCOL = 'http';
const PORT = '3500';

@Injectable()
export class RestDatasource {
  baseUrl: string;
  authToken: string;

  constructor(private http: Http) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  saveProduct(product: Product): Observable<Product> {
    return this.sendRequest(RequestMethod.Post, "products", product, true);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.sendRequest(RequestMethod.Put, `products/${product.id}`, product, true);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.sendRequest(RequestMethod.Delete, `products/${id}`, null, true);
  }

  getOrders(): Observable<Order[]> {
    return this.sendRequest(RequestMethod.Get, "orders", null, true);
  }

  deleteOrder(id: number): Observable<Order> {
    return this.sendRequest(RequestMethod.Delete, `orders/${id}`, null, true);
  }

  updateOrder(order: Order): Observable<Product> {
    return this.sendRequest(RequestMethod.Put, `orders/${order.id}`, order, true);
  }

  getProducts(): Observable<Product[]> {
    return this.sendRequest(RequestMethod.Get, "products");
  }

  saveOrder(order: Order) {
    return this.sendRequest(RequestMethod.Post, "orders", order);
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.request(new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "login",
      body: {name: user, password: pass}
    })).map(response => {
      let r = response.json();
      this.authToken = r.success ? r.token : null;
      return r.success;
    });
  }

  private sendRequest(verb: RequestMethod, url: string, body?: Order | Product, auth: boolean = false): Observable<Product | Product[] | Order | Order[]> {
    let request = new Request({
      method: verb,
      url: this.baseUrl + url,
      body: body
    });
    if (auth && this.authToken !== null) {
      request.headers.set("Authorization", `Bearer<${this.authToken}>`);
    }
    return this.http.request(request).map((response) => response.json());
  }
}
