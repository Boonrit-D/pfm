import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-transaction-v2',
  templateUrl: './edit-transaction-v2.component.html',
  styleUrl: './edit-transaction-v2.component.css'
})
export class EditTransactionV2Component {

  getId: any;
  updateFormV2: FormGroup;
  currentDate = new Date();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.updateFormV2 = this.formBuilder.group({
      date: [new Date],
      type: [''],
      amount: [''],
      description: [''],
      category: [''],
    });

    this.getId = this.activatedRouter.snapshot.paramMap.get('id');

    this.crudService.GetTransactionV2(this.getId).subscribe(res => {
      this.updateFormV2.setValue({
        date: res['date'],
        type: res['type'],
        amount: res['amount'],
        description: res['description'],
        category: res['category']
      });
    });
  }

  ngOnInit(): void {}

  onUpdateV2(): any {
    console.log('Updating with:', this.updateFormV2.value);
    this.crudService.updateTransactionV2(this.getId, this.updateFormV2.value).subscribe({
      next: (response) => {
        console.log('Response:', response);
        console.log("Data updated successfully");
        this.ngZone.run(() => {
          console.log('Navigating to transactions-list');
          this.router.navigateByUrl('/dashboard');
        });
      },
      error: (err) => {
        console.log('Error:', err);
      },
      complete: () => {
        console.log('Update process completed');
      }
    });
  }

}
