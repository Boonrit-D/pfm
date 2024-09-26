import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.css'
})
export class EditAccountComponent {

  getId: any;
  updateAccount: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.updateAccount = this.formBuilder.group({
      accountName: [''],
      currency: [''],
      balance: [],
      description: ['']
    });

    this.getId = this.activatedRouter.snapshot.paramMap.get('id');

    this.crudService.GetAccount(this.getId).subscribe(res => {
      this.updateAccount.setValue({
        accountName: res['accountName'],
        currency: res['currency'],
        balance: res['balance'],
        description: res['description']
      });
    });
  }

  ngOnInit(): void {}

  onUpdate(): any {
    console.log('Updating with:', this.updateAccount.value);
    this.crudService.updateAccount(this.getId, this.updateAccount.value).subscribe({
      next: (response) => {
        console.log('Response:', response);
        console.log("Data updated successfully");
        this.ngZone.run(() => {
          console.log('Navigating to account-list');
          this.router.navigateByUrl('/account');
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
