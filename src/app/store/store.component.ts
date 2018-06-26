import {Component} from '@angular/core';
import {ProductRepository} from '../model/product.repository';
import {Product} from '../model/product.model';

@Component({
  selector: 'store',
  moduleId: module.id,
  templateUrl: 'store.component.html'
})
export class StoreComponent {
  public selectedCategory = null;
  public productPerPage = 4;
  public selectedPage = 1;

  constructor(private repository: ProductRepository) {
  }

  get products(): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productPerPage;
    return this.repository.getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productPerPage);
  }

  get categories(): string[] {
    return this.repository.getCategories();
  }

  changeCategory(newCategory ?: string) {
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number) {
    this.productPerPage = Number(newSize);
  }

  get pageCount(): number {
    return Math.ceil(this.repository
      .getProducts(this.selectedCategory).length / this.productPerPage);
  }
  //
  // get pageNumbers(): number[] {
  //   return Array(Math.ceil(this.repository
  //     .getProducts(this.selectedCategory).length / this.productPerPage))
  //     .fill(0).map((x, i) => i + 1);
  // }
}
