import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../../services/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-account',
  host: { '[attr.data-id]': 'uniqueId' },
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css',
})
export class UpdateAccountComponent {
  getAccountId: any;
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
      description: [''],
    });

    this.getAccountId =
      this.activatedRouter.snapshot.paramMap.get('accountId');

    this.crudService.getAccount(this.getAccountId).subscribe((res) => {
      this.updateAccount.setValue({
        accountName: res['accountName'],
        currency: res['currency'],
        balance: res['balance'],
        description: res['description'],
      });
    });
  }

  onUpdate(): any {
    console.log('Updating with:', this.updateAccount.value);
    this.crudService
      .updateAccount(this.getAccountId, this.updateAccount.value)
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
          console.log('Data updated successfully');
          this.ngZone.run(() => {
            console.log('Navigating to account-list');
            this.router.navigateByUrl('/accounts');
          });
        },
        error: (err) => {
          console.log('Error:', err);
        },
        complete: () => {
          console.log('Update process completed');
        },
      });
  }
}
