import {NgModule} from '@angular/core';
import {StaticDataSource} from './static.datasource';
import {ProductRepository} from './product.repository';
import {Cart} from './cart.model';
import {Order} from './order.model';
import {OrderRepository} from './order.repository';
import {RestDatasource} from "./rest.datasource";
import {HttpModule} from "@angular/http";
import {AuthService} from "./auth.service";

@NgModule({
  imports: [HttpModule],
  providers: [StaticDataSource, ProductRepository, Cart,
    Order, OrderRepository,
    {provide: StaticDataSource, useClass: RestDatasource},
    RestDatasource, AuthService
  ]
})
export class ModelModule {
}
