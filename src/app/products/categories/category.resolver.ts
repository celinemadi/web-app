/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ProductsService } from 'app/products/products.service';

/**
 * Category data resolver.
 */
@Injectable()
export class CategoryResolver implements Resolve<Object> {

  /**
   * @param {productsService} productsService Products service.
   */
  constructor(private productsService: ProductsService) {}

  /**
   * Returns the category data.
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const categoryId = route.paramMap.get('id');
    return this.productsService.getCategory(categoryId);
  }

}
