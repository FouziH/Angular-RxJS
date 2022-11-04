import { Component } from '@angular/core';

import { catchError, EMPTY } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId = 0;

  products$ = this.productService.productsWithCategory$
  .pipe(
    catchError(error => {
      this.errorMessage = error;
      return EMPTY
    })
  )

selectedProduct$ = this.productService.selectedProduct$
  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    console.log('Not yet implemented');
    this.productService.selectedProductChanged(+productId)
  }
}
