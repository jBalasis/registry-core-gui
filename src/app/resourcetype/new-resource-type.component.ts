import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResourceTypeService} from '../services/resource-type.service';


@Component({
  selector: 'app-resource-type-form',
  templateUrl: './new-resource-type.component.html'
})

export class NewResourceTypeComponent implements OnInit {

  resourceTypeForm: FormGroup;

  constructor(
    private resourceTypeService: ResourceTypeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.resourceTypeForm = this.fb.group({
      name: ['', Validators.required],
      schema: ['', Validators.required],
      schemaUrl: ['', Validators.required],
      payloadType: ['', Validators.required],
      // creationDate: [''],
      // modificationDate: [''],
      indexMapperClass: ['', Validators.required],
      // indexFields: this.fb.array([
      //   this.fb.control('')
      // ]),
    });
    this.resourceTypeForm.get('schemaUrl').disable();
    this.resourceTypeForm.get('indexMapperClass').disable();
    this.resourceTypeForm.get('payloadType').setValue('xml');
  }

  postResourceType(): void {
    this.resourceTypeForm.get('indexMapperClass').enable();
    if (this.resourceTypeForm.get('indexMapperClass').value === '') {
      this.resourceTypeForm.get('indexMapperClass').setValue(
        'eu.openminted.registry.core.index.DefaultIndexMapper');
    }
    console.log(this.resourceTypeForm.value);
    this.resourceTypeService.addResourceType(this.resourceTypeForm.value).subscribe();
  }

  updateIndexMapperClass(select: string) {
    if (select === 'default') {
      this.resourceTypeForm.get('indexMapperClass').disable();
      this.resourceTypeForm.get('indexMapperClass').setValue('');
    } else {
      this.resourceTypeForm.get('indexMapperClass').enable();
    }
  }

  radioBtnUrl(select: string): void {
    if (select === 'url') {
      this.resourceTypeForm.get('schema').disable();
      this.resourceTypeForm.get('schemaUrl').enable();
      this.resourceTypeForm.get('schema').setValue('');
    } else {
      this.resourceTypeForm.get('schemaUrl').disable();
      this.resourceTypeForm.get('schema').enable();
      this.resourceTypeForm.get('schemaUrl').setValue('');
    }
  }

  goBack() {
    window.history.back();
  }

}
