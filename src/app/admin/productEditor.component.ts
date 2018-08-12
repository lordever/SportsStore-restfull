import {Component} from "@angular/core";
import {Product} from "../model/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductRepository} from "../model/product.repository";
import {NgForm} from "@angular/forms";

@Component({
  moduleId: module.id,
  templateUrl: "productEditor.component.html"
})
export class ProductEditorComponent {
  editing: boolean = false;
  product: Product = new Product();

  constructor(private repository: ProductRepository,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.editing = this.activatedRoute.snapshot.params["mode"] === "edit";

    if (this.editing) {
      Object.assign(this.product,
        repository.getProduct(this.activatedRoute.snapshot.params["id"])
      );
    }
  }

  save(form: NgForm){
    this.repository.saveProduct(this.product);
    this.router.navigateByUrl("/admin/main/products");
  }
}

