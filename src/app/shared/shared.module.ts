import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { NgxPaginationModule } from 'ngx-pagination';

const SHARED_MODULES = [
  CommonModule,
  // import FormsModule, NgForm will get automatically attached to any <form>, ngform give FormGroup named ngForm and ngSubmit output
  FormsModule,
  // ReactiveFormsModule will provide formControl, ngFormGroup
  ReactiveFormsModule,
  NgxTypeaheadModule,
  NgxPaginationModule,
];

@NgModule({
  imports: SHARED_MODULES,
  exports: [
    ...SHARED_MODULES
  ],
})
export class CmSharedModule { }
