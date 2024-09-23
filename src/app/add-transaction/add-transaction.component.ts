import { Component, OnInit, NgZone } from '@angular/core';
//
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from './../service/crud.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css',
})

export class AddTransactionComponent implements OnInit {
  // Begin
  transactionForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  )
  {
    this.transactionForm = this.formBuilder.group({
      title: [''],
      type: [''],
      amount: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): any {
    this.crudService.AddTransaction(this.transactionForm.value).subscribe({
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

  // End
}
