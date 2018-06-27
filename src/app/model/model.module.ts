import {NgModule} from '@angular/core';
import {StaticDataSource} from './static.datasource';
import {ProductRepository} from './product.repository';
import {Cart} from './cart.model';

@NgModule({
  providers: [StaticDataSource, ProductRepository, Cart]
})
export class ModelModule{}
