import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from 'app/shared/delete-dialog/delete-dialog.component';

import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';
import { InputBase } from 'app/shared/form-dialog/formfield/model/input-base';
import { SelectBase } from 'app/shared/form-dialog/formfield/model/select-base';
import { ProductsService } from 'app/products/products.service';

@Component({
  selector: 'mifosx-loan-product-terms-step',
  templateUrl: './loan-product-terms-step.component.html',
  styleUrls: ['./loan-product-terms-step.component.scss']
})
export class LoanProductTermsStepComponent implements OnInit {

  @Input() loanProductsTemplate: any;
  @Input() category:any;
  loanProductTermsForm: FormGroup;

  valueConditionTypeData: any;
  lpOptions = [{ id: "Silver", value: "Silver" }, { id: "Gold", value: "Gold" }, { id: "Platinum", value: "Platinum" }, { id: "Diamond", value: "Diamond" }];
  floatingRateData: any;
  interestRateFrequencyTypeData: any;
  repaymentFrequencyTypeData: any;

  displayedColumns: string[] = ['valueConditionType', 'borrowerCycleNumber', 'minValue', 'defaultValue', 'maxValue', 'actions'];
  displayedColumnsLP: string[] = ['loyaltyProfile', 'defaultValue', 'actions'];
  categoryObject: any;
  categoryId: any;
  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private productsService: ProductsService,) {

    this.createLoanProductTermsForm();
    this.setConditionalControls();
  }

  ngOnInit() {
    this.valueConditionTypeData = this.loanProductsTemplate.valueConditionTypeOptions;
    this.floatingRateData = this.loanProductsTemplate.floatingRateOptions;
    this.interestRateFrequencyTypeData = this.loanProductsTemplate.interestRateFrequencyTypeOptions;
    this.repaymentFrequencyTypeData = this.loanProductsTemplate.repaymentFrequencyTypeOptions;
    this.loanProductTermsForm.patchValue({
     
      'principal': this.loanProductsTemplate.principal,
      'numberOfRepayments': this.loanProductsTemplate.numberOfRepayments,
      // 'isLinkedToFloatingInterestRates': this.loanProductsTemplate.isLinkedToFloatingInterestRates,
      'minInterestRatePerPeriod': this.loanProductsTemplate.minInterestRatePerPeriod,
      'interestRatePerPeriod': this.loanProductsTemplate.interestRatePerPeriod,
      'maxInterestRatePerPeriod': this.loanProductsTemplate.maxInterestRatePerPeriod,
      'interestRateFrequencyType': this.loanProductsTemplate.interestRateFrequencyType.id,
      // 'floatingRatesId': this.loanProductsTemplate.floatingRateId,
      // 'interestRateDifferential': this.loanProductsTemplate.interestRateDifferential,
      // 'isFloatingInterestRateCalculationAllowed': this.loanProductsTemplate.isFloatingInterestRateCalculationAllowed,
      // 'minDifferentialLendingRate': this.loanProductsTemplate.minDifferentialLendingRate,
      // 'defaultDifferentialLendingRate': this.loanProductsTemplate.defaultDifferentialLendingRate,
      // 'maxDifferentialLendingRate': this.loanProductsTemplate.maxDifferentialLendingRate,
      'useBorrowerCycle': this.loanProductsTemplate.useBorrowerCycle,
      'useLoyaltyProfile': this.loanProductsTemplate.useLoyaltyProfile,
      'repaymentEvery': this.loanProductsTemplate.repaymentEvery,
      'repaymentFrequencyType': this.loanProductsTemplate.repaymentFrequencyType.id,
      'minimumDaysBetweenDisbursalAndFirstRepayment': this.loanProductsTemplate.minimumDaysBetweenDisbursalAndFirstRepayment
    });

    this.productsService.getCategory('1').subscribe(cat => {
      this.loanProductTermsForm.patchValue({
        'minPrincipal': cat.minimum,
        'maxPrincipal': cat.maximum,
        'minNumberOfRepayments': cat.minNumberOfPayments,
        'maxNumberOfRepayments': cat.maxNumberOfPayments,
      });

    });
    this.category.valueChanges
      .subscribe((category: any) => {

        this.productsService.getCategory(category).subscribe(cat => {
          this.loanProductTermsForm.patchValue({
            'minPrincipal': cat.minimum,
            'maxPrincipal': cat.maximum,
            'minNumberOfRepayments': cat.minNumberOfPayments,
            'maxNumberOfRepayments': cat.maxNumberOfPayments,
          });

        });


      })


    this.loanProductTermsForm.setControl('principalVariationsForBorrowerCycle',
      this.formBuilder.array(this.loanProductsTemplate.principalVariationsForBorrowerCycle.map((variation: any) => ({ ...variation, valueConditionType: variation.valueConditionType.id }))));
    this.loanProductTermsForm.setControl('principalVariationsForBorrowerCycle',
      this.formBuilder.array(this.loanProductsTemplate.principalVariationsForBorrowerCycle.map((variation: any) => ({ ...variation, valueConditionType: variation.valueConditionType.id }))));
    this.loanProductTermsForm.setControl('principalVariationsForBorrowerCycle',
      this.formBuilder.array(this.loanProductsTemplate.principalVariationsForBorrowerCycle.map((variation: any) => ({ ...variation, valueConditionType: variation.valueConditionType.id }))));


    this.loanProductTermsForm.setControl('interestRateVariationsForLoyaltyProfile',
      this.formBuilder.array(this.loanProductsTemplate.interestRateVariationsForLoyaltyProfile.map((variation: any) => ({ ...variation, loyaltyProfile: variation.loyaltyProfile }))));
    this.loanProductTermsForm.setControl('interestFreePeriodVariationsForLoyaltyProfile',
      this.formBuilder.array(this.loanProductsTemplate.interestFreePeriodVariationsForLoyaltyProfile.map((variation: any) => ({ ...variation, loyaltyProfile: variation.loyaltyProfile }))));
    this.loanProductTermsForm.setControl('graceOnInterestPaymentVariationsForLoyaltyProfile',
      this.formBuilder.array(this.loanProductsTemplate.graceOnInterestPaymentVariationsForLoyaltyProfile.map((variation: any) => ({ ...variation, loyaltyProfile: variation.loyaltyProfile }))));
    this.loanProductTermsForm.setControl('graceOnPrincipalPaymentVariationsForLoyaltyProfile',
      this.formBuilder.array(this.loanProductsTemplate.graceOnPrincipalPaymentVariationsForLoyaltyProfile.map((variation: any) => ({ ...variation, loyaltyProfile: variation.loyaltyProfile }))));
  }

  createLoanProductTermsForm() {
    this.loanProductTermsForm = this.formBuilder.group({
      'useBorrowerCycle': [false],
      'useLoyaltyProfile': [false],
      'minPrincipal': [''],
      'principal': ['', Validators.required],
      'maxPrincipal': [''],
      'minNumberOfRepayments': [''],
      'numberOfRepayments': ['', Validators.required],
      'maxNumberOfRepayments': [''],
      // 'isLinkedToFloatingInterestRates': [false],
      'minInterestRatePerPeriod': [''],
      'interestRatePerPeriod': ['', Validators.required],
      'maxInterestRatePerPeriod': [''],
      'interestRateFrequencyType': ['', Validators.required],
      'repaymentEvery': ['', Validators.required],
      'repaymentFrequencyType': ['', Validators.required],
      'minimumDaysBetweenDisbursalAndFirstRepayment': ['']
    });
  }

  setConditionalControls() {
    // this.loanProductTermsForm.get('isLinkedToFloatingInterestRates').valueChanges
    //   .subscribe(isLinkedToFloatingInterestRates => {
    //     if (isLinkedToFloatingInterestRates) {
    //       this.loanProductTermsForm.removeControl('minInterestRatePerPeriod');
    //       this.loanProductTermsForm.removeControl('interestRatePerPeriod');
    //       this.loanProductTermsForm.removeControl('maxInterestRatePerPeriod');
    //       this.loanProductTermsForm.removeControl('interestRateFrequencyType');
    //       this.loanProductTermsForm.addControl('floatingRatesId', new FormControl('', Validators.required));
    //       this.loanProductTermsForm.addControl('interestRateDifferential', new FormControl('', Validators.required));
    //       this.loanProductTermsForm.addControl('isFloatingInterestRateCalculationAllowed', new FormControl(false));
    //       this.loanProductTermsForm.addControl('minDifferentialLendingRate', new FormControl('', Validators.required));
    //       this.loanProductTermsForm.addControl('defaultDifferentialLendingRate', new FormControl('', Validators.required));
    //       this.loanProductTermsForm.addControl('maxDifferentialLendingRate', new FormControl('', Validators.required));
    //     } else {
    //       this.loanProductTermsForm.addControl('minInterestRatePerPeriod', new FormControl(''));
    //       this.loanProductTermsForm.addControl('interestRatePerPeriod', new FormControl('', Validators.required));
    //       this.loanProductTermsForm.addControl('maxInterestRatePerPeriod', new FormControl(''));
    //       this.loanProductTermsForm.addControl('interestRateFrequencyType', new FormControl(this.interestRateFrequencyTypeData.id, Validators.required));
    //       this.loanProductTermsForm.removeControl('floatingRatesId');
    //       this.loanProductTermsForm.removeControl('interestRateDifferential');
    //       this.loanProductTermsForm.removeControl('isFloatingInterestRateCalculationAllowed');
    //       this.loanProductTermsForm.removeControl('minDifferentialLendingRate');
    //       this.loanProductTermsForm.removeControl('defaultDifferentialLendingRate');
    //       this.loanProductTermsForm.removeControl('maxDifferentialLendingRate');
    //     }
    //   });

    this.loanProductTermsForm.get('useBorrowerCycle').valueChanges
      .subscribe(useBorrowerCycle => {
        if (useBorrowerCycle) {
          this.loanProductTermsForm.addControl('principalVariationsForBorrowerCycle', this.formBuilder.array([]));
          this.loanProductTermsForm.addControl('numberOfRepaymentVariationsForBorrowerCycle', this.formBuilder.array([]));
          this.loanProductTermsForm.addControl('interestRateVariationsForBorrowerCycle', this.formBuilder.array([]));
        } else {
          this.loanProductTermsForm.removeControl('principalVariationsForBorrowerCycle');
          this.loanProductTermsForm.removeControl('numberOfRepaymentVariationsForBorrowerCycle');
          this.loanProductTermsForm.removeControl('interestRateVariationsForBorrowerCycle');
        }
      });
    this.loanProductTermsForm.get('useLoyaltyProfile').valueChanges
      .subscribe(useBorrowerCycle => {
        if (useBorrowerCycle) {
          this.loanProductTermsForm.addControl('interestRateVariationsForLoyaltyProfile', this.formBuilder.array([]));
          this.loanProductTermsForm.addControl('interestFreePeriodVariationsForLoyaltyProfile', this.formBuilder.array([]));
          this.loanProductTermsForm.addControl('graceOnInterestPaymentVariationsForLoyaltyProfile', this.formBuilder.array([]));
          this.loanProductTermsForm.addControl('graceOnPrincipalPaymentVariationsForLoyaltyProfile', this.formBuilder.array([]));
        } else {
          this.loanProductTermsForm.removeControl('interestRateVariationsForLoyaltyProfile');
          this.loanProductTermsForm.removeControl('interestFreePeriodVariationsForLoyaltyProfile');
          this.loanProductTermsForm.removeControl('graceOnInterestPaymentVariationsForLoyaltyProfile');
          this.loanProductTermsForm.removeControl('graceOnPrincipalPaymentVariationsForLoyaltyProfile');
        }
      });
  }

  get principalVariationsForBorrowerCycle(): FormArray {
    return this.loanProductTermsForm.get('principalVariationsForBorrowerCycle') as FormArray;
  }

  get numberOfRepaymentVariationsForBorrowerCycle(): FormArray {
    return this.loanProductTermsForm.get('numberOfRepaymentVariationsForBorrowerCycle') as FormArray;
  }

  get interestRateVariationsForBorrowerCycle(): FormArray {
    return this.loanProductTermsForm.get('interestRateVariationsForBorrowerCycle') as FormArray;
  }
  get interestRateVariationsForLoyaltyProfile(): FormArray {
    return this.loanProductTermsForm.get('interestRateVariationsForLoyaltyProfile') as FormArray;
  }

  get interestFreePeriodVariationsForLoyaltyProfile(): FormArray {
    return this.loanProductTermsForm.get('interestFreePeriodVariationsForLoyaltyProfile') as FormArray;
  }

  get graceOnInterestPaymentVariationsForLoyaltyProfile(): FormArray {
    return this.loanProductTermsForm.get('graceOnInterestPaymentVariationsForLoyaltyProfile') as FormArray;
  }
  get graceOnPrincipalPaymentVariationsForLoyaltyProfile(): FormArray {
    return this.loanProductTermsForm.get('graceOnPrincipalPaymentVariationsForLoyaltyProfile') as FormArray;
  }

  setLoanProductTermsFormDirty() {
    if (this.loanProductTermsForm.pristine) {
      this.loanProductTermsForm.markAsDirty();
    }
  }

  addVariationsForBorrowerCycle(formType: string, variationsForBorrowerCycleFormArray: FormArray) {
    const data = this.getData(formType);
    const addVariationsForBorrowerCycleDialogRef = this.dialog.open(FormDialogComponent, { data });
    addVariationsForBorrowerCycleDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        variationsForBorrowerCycleFormArray.push(response.data);
        this.setLoanProductTermsFormDirty();
      }
    });
  }

  editVariationsForBorrowerCycle(formType: string, variationsForBorrowerCycleFormArray: FormArray, index: number) {
    const data = { ...this.getData(formType, variationsForBorrowerCycleFormArray.at(index).value), layout: { addButtonText: 'Edit' } };
    const addVariationsForBorrowerCycleDialogRef = this.dialog.open(FormDialogComponent, { data });
    addVariationsForBorrowerCycleDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        variationsForBorrowerCycleFormArray.at(index).patchValue(response.data.value);
        this.setLoanProductTermsFormDirty();
      }
    });
  }

  deleteVariationsForBorrowerCycle(variationsForBorrowerCycleFormArray: FormArray, index: number) {
    const deleteVariationsForBorrowerCycleDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `this` }
    });
    deleteVariationsForBorrowerCycleDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        variationsForBorrowerCycleFormArray.removeAt(index);
        this.setLoanProductTermsFormDirty();
      }
    });
  }

  getData(formType: string, values?: any) {
    switch (formType) {
      case 'Principal': return { title: 'Principal by loan cycle', formfields: this.getFormfields(values) };
      case 'NumberOfRepayments': return { title: 'Number of repayments by loan cycle', formfields: this.getFormfields(values) };
      case 'NominalInterestRate': return { title: 'Nominal interest rate by loan cycle', formfields: this.getFormfields(values) };
    }
  }
  getDataLP(formType: string, values?: any) {
    switch (formType) {
      case 'InterestRate': return { title: 'Interest rate by loyalty profile', formfields: this.getFormfieldsLP(values) };
      case 'InterestFreePeriod': return { title: 'Interest free period  by loyalty profile', formfields: this.getFormfieldsLP(values) };
      case 'GraceOnInterestPayment': return { title: 'Grace on interest payment  by loyalty profile', formfields: this.getFormfieldsLP(values) };
      case 'GraceOnPrincipalPayment': return { title: 'Grace on principal payment  by loyalty profile', formfields: this.getFormfieldsLP(values) };
    }
  }
  addVariationsForLoyaltyProfile(formType: string, variationsForLoyaltyProfileFormArray: FormArray) {
    const data = this.getDataLP(formType);
    const addVariationsForLoyaltyProfileDialogRef = this.dialog.open(FormDialogComponent, { data });
    addVariationsForLoyaltyProfileDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        variationsForLoyaltyProfileFormArray.push(response.data);
        this.setLoanProductTermsFormDirty();
      }
    });
  }

  editVariationsForLoyaltyProfile(formType: string, variationsForLoyaltyProfileFormArray: FormArray, index: number) {
    const data = { ...this.getDataLP(formType, variationsForLoyaltyProfileFormArray.at(index).value), layout: { addButtonText: 'Edit' } };
    const addVariationsForLoyaltyProfileDialogRef = this.dialog.open(FormDialogComponent, { data });
    addVariationsForLoyaltyProfileDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        variationsForLoyaltyProfileFormArray.at(index).patchValue(response.data.value);
        this.setLoanProductTermsFormDirty();
      }
    });
  }

  deleteVariationsForLoyaltyProfile(variationsForLoyaltyProfileFormArray: FormArray, index: number) {
    const deleteVariationsForLoyaltyProfileDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `this` }
    });
    deleteVariationsForLoyaltyProfileDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        variationsForLoyaltyProfileFormArray.removeAt(index);
        this.setLoanProductTermsFormDirty();
      }
    });
  }
  getFormfields(values?: any) {
    const formfields: FormfieldBase[] = [
      new SelectBase({
        controlName: 'valueConditionType',
        label: 'Condition',
        value: values ? values.valueConditionType : this.valueConditionTypeData[0].id,
        options: { label: 'value', value: 'id', data: this.valueConditionTypeData },
        required: true,
        order: 1
      }),
      new InputBase({
        controlName: 'borrowerCycleNumber',
        label: 'Loan Cycle',
        value: values ? values.borrowerCycleNumber : undefined,
        type: 'number',
        required: true,
        order: 2
      }),
      new InputBase({
        controlName: 'minValue',
        label: 'Minimum',
        value: values ? values.minValue : undefined,
        type: 'number',
        order: 3
      }),
      new InputBase({
        controlName: 'defaultValue',
        label: 'Default',
        value: values ? values.defaultValue : undefined,
        type: 'number',
        required: true,
        order: 4
      }),
      new InputBase({
        controlName: 'maxValue',
        label: 'Maximum',
        value: values ? values.maxValue : undefined,
        type: 'number',
        order: 5
      })
    ];
    return formfields;
  }


  getFormfieldsLP(values?: any) {
    const formfields: FormfieldBase[] = [
      new SelectBase({
        controlName: 'loyaltyProfile',
        label: 'Loyalty Profile',
        value: values ? values.loyaltyProfile : this.lpOptions[0].value,
        options: { label: 'value', value: 'value', data: this.lpOptions },
        required: true,
        order: 1
      }),
      new InputBase({
        controlName: 'defaultValue',
        label: 'Default',
        value: values ? values.defaultValue : undefined,
        type: 'number',
        required: true,
        order: 2
      }),
    ];
    return formfields;
  }


  get loanProductTerms() {
    return this.loanProductTermsForm.value;
  }

}
