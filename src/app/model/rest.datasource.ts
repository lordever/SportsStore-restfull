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

  constructor(private http: Http) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProducts(): Observable<Product[]> {
    return this.sendRequest(RequestMethod.Get, "products");
  }

  saveOrder(order: Order) {
    return this.sendRequest(RequestMethod.Post, "orders", order);
  }

  private sendRequest(verb: RequestMethod, url: string, body?: Order | Product): Observable<Product | Order> {
    return this.http.request(new Request({
      method: verb,
      url: this.baseUrl + url,
      body: body
    })).map((response) => response.json());
  }
}
