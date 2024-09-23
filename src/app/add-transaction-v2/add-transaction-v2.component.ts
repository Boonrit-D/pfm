import { Component, OnInit, NgZone } from '@angular/core';
//
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from './../service/crud.service';

@Component({
  selector: 'app-add-transaction-v2',
  templateUrl: './add-transaction-v2.component.html',
  styleUrl: './add-transaction-v2.component.css'
})
export class AddTransactionV2Component {

  // Begin
  transactionV2Form: FormGroup;
  currentDate = new Date();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  )
  {
    this.transactionV2Form = this.formBuilder.group({
      date: [this.currentDate],
      type: [''],
      amount: [''],
      description: [''],
      category: ['']
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): any {
    this.crudService.AddTransactionV2(this.transactionV2Form.value).subscribe({
      next: () => {
        console.log('data added successfully');
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      },
    });
  }

}
