import { Component, OnInit, OnDestroy } from '@angular/core';

import { catchError, EMPTY, from, Observable, of, Subscription } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];

  products$: Observable<Product[]> | undefined
 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   this.products$ = this.productService.getProducts()
   .pipe(
    catchError(e => {
      this.errorMessage = e;
      // return EMPTY
      // return from([])
      return of([])
    })
   )
  }


  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
