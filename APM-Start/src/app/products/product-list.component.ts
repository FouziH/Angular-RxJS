import { Component, ChangeDetectionStrategy } from '@angular/core';

import {
  catchError,
  combineLatest,
  EMPTY,
  filter,
  from,
  map,
  Observable,
  of,
  startWith,
  Subject,
  Subscription,
  tap,
} from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from '../product-categories/product-category.service';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  // categories: ProductCategory[] = [];
  // selectedCategoryId!: number
  private categorySelectedSubject = new Subject<number>();
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$.pipe(startWith(0)),
  ]).pipe(
    map(([products, selectedCatogoryId]) =>
      products.filter((product) =>
        selectedCatogoryId ? product.categoryId === selectedCatogoryId : true
      )
    ),
    catchError((error) => {
      this.errorMessage = error;
      return EMPTY;
    })
  );


  // products$ = this.productService.productsWithCategory$
  // .pipe(
  //   catchError(e => {
  //     this.errorMessage = e;
  //     // return EMPTY
  //     // return from([])
  //     return of([])
  //   })
  //  );

  //  productsSimpleFilter$ = this.productService.productsWithCategory$
  //  .pipe(
  //     map((products: any) =>
  //       products.filter(( product: any) => {
  //         return this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true
  //       }
  // )))
  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((error) => {
      this.errorMessage = error;
      return EMPTY;
    })
  );
  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    // this.selectedCategoryId = +categoryId

    console.log('CategoryID', categoryId);

    this.categorySelectedSubject.next(+categoryId);
  }
}
