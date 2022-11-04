import { Component, ChangeDetectionStrategy } from '@angular/core';

import { catchError, EMPTY, filter, from, map, Observable, of, Subscription } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from "../product-categories/product-category.service";

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent  {
  pageTitle = 'Product List';
  errorMessage = '';
  // categories: ProductCategory[] = [];
  selectedCategoryId!: number

  products$ = this.productService.productsWithCategory$
  .pipe(
    catchError(e => {
      this.errorMessage = e;
      // return EMPTY
      // return from([])
      return of([])
    })
   );
 
   productsSimpleFilter$ = this.productService.productsWithCategory$
   .pipe(
      map((products: any) =>  
        products.filter(( product: any) => {
          return this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true
        }
  )))
  categories$ = this.productCategoryService.productCategories$
  .pipe(

    catchError(error  => {
      this.errorMessage = error;
     return EMPTY
    })
  )
  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }



  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.selectedCategoryId = +categoryId
  }
}
