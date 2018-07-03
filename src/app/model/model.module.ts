import {NgModule} from '@angular/core';
import {StaticDataSource} from './static.datasource';
import {ProductRepository} from './product.repository';
import {Cart} from './cart.model';
import {Order} from './order.model';
import {OrderRepository} from './order.repository';

@NgModule({
  providers: [StaticDataSource, ProductRepository, Cart,
    Order, OrderRepository]
})
export class ModelModule {
}
