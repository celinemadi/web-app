/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

/** Custom Services */
import { ProductsService } from 'app/products/products.service';

/**
 * Edit Category component.
 */
@Component({
  selector: 'mifosx-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  /** Selected Data. */
  categoryData: any;
  /** Category form. */
  categoryForm: FormGroup;
   

    /**
     * Retrieves the category data from `resolve`.
     * @param {ProductsService} productsService Products Service.
     * @param {FormBuilder} formBuilder Form Builder.
     * @param {ActivatedRoute} route Activated Route.
     * @param {Router} router Router for navigation.
     */
  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.data.subscribe((data: { categoriesTemplate: any }) => {
      this.categoryData = data.categoriesTemplate;
    });
  }

  ngOnInit() {
    this.editCategoryForm();
  }

  /**
   * Edit Category form.
   */
  editCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      
      'name': [this.categoryData.name, Validators.required],
      'display_name': [this.categoryData.display_name, Validators.required],
      'short_name': [this.categoryData.short_name, Validators.required],
      'currencyCode': [this.categoryData.currencyCode, Validators.required],
      'minimum': [this.categoryData.minimum, [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d+)?\\s*$')]],
      'maximum': [this.categoryData.maximum, [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d+)?\\s*$')]],
      'minNumberOfPayments': [this.categoryData.minNumberOfPayments, [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d+)?\\s*$')]],
      'maxNumberOfPayments': [this.categoryData.maxNumberOfPayments, [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d+)?\\s*$')]],
      'duration': [this.categoryData.duration, Validators.required],

    });
   
  }
 
  /**
   * Submits Edit Category form.
   */
  submit() {
    const categories = this.categoryForm.value;
    this.productsService.updateCategory(this.categoryData.id.toString(), categories)
      .subscribe((response: any) => {
        this.router.navigate(['../'], { relativeTo: this.route });
   });
  }

}
