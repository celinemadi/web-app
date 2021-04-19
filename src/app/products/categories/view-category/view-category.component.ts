/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

/** Custom Services */
import { ProductsService } from 'app/products/products.service';

/** Custom Components */
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';

/**
 * View Category Component.
 */
@Component({
  selector: 'mifosx-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  /** Category data. */
  categoryData: any;

  /**
   * Retrieves the category data from `resolve`.
   * @param {ProductsService} productsService Products Service.
   * @param {ActivatedRoute} route Activated Route.
   * @param {Router} router Router for navigation.
   * @param {MatDialog} dialog Dialog reference.
   */
  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
    this.route.data.subscribe((data: { category: any }) => {
      this.categoryData = data.category;
    });
  }

  ngOnInit() {
  }

  /**
   * Deletes the category and redirects to categories.
   */
  deleteCategory() {
    const deleteCategoryDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `category ${this.categoryData.id}` }
    });
    deleteCategoryDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        this.productsService.deleteCategory(this.categoryData.id)
          .subscribe(() => {
            this.router.navigate(['/products/categories']);
          });
      }
    });
  }

}
