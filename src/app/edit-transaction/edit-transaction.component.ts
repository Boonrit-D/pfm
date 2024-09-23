import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.css'
})
export class EditTransactionComponent {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.updateForm = this.formBuilder.group({
      title: [''],
      type: [''],
      amount: [''],
    });
  
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');
  
    this.crudService.GetTransaction(this.getId).subscribe(res => {
      this.updateForm.setValue({
        title: res['title'],
        type: res['type'],
        amount: res['amount'],
      });
    });
  }

  ngOnInit(): void {}

  onUpdate(): any {
    console.log('Updating with:', this.updateForm.value);
    this.crudService.updateTransaction(this.getId, this.updateForm.value).subscribe({
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
