/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

/** Custom Services */
import { ProductsService } from '../../products.service';

/**
 * Create category component.
 */
@Component({
  selector: 'mifosx-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  /** Category form. */
  categoryForm: FormGroup;

  
  constructor(private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,) {

  }

  /**
   * Creates and sets the category form.
   */
  ngOnInit() {
    this.createCategoryForm();
  }

  /**
   * Creates the category form.
   */
  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({

      'name': ['', Validators.required],
      'short_name': ['', Validators.required],
      'display_name': ['', Validators.required],
      'currencyCode': ['', Validators.required],
      'minimum': ['', [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d+)?\\s*$')]],
      'maximum': ['', [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d+)?\\s*$')]],
      'minNumberOfPayments': ['', [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d+)?\\s*$')]],
      'maxNumberOfPayments': ['', [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d+)?\\s*$')]],
      'duration': ['', Validators.required],
    });
  }


  /**
   * Submits the category form and creates category,
   * if successful redirects to categories.
   */
  submit() {

    const category = this.categoryForm.getRawValue();
    this.productsService.createCategory(category).subscribe((response: any) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
