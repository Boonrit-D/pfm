import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DemoCrudService } from '../../../../services/demo-crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css',
})
export class UpdateDemoAccountComponent {
  getDemoAccountId: any;
  updateDemoAccount: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private demoCrudService: DemoCrudService
  ) {
    this.updateDemoAccount = this.formBuilder.group({
      accountName: [''],
      currency: [''],
      balance: [],
      description: [''],
    });

    this.getDemoAccountId =
      this.activatedRouter.snapshot.paramMap.get('accountId');

    this.demoCrudService.getAccount(this.getDemoAccountId).subscribe((res) => {
      this.updateDemoAccount.setValue({
        accountName: res['accountName'],
        currency: res['currency'],
        balance: res['balance'],
        description: res['description'],
      });
    });
  }

  onUpdate(): any {
    console.log('Updating with:', this.updateDemoAccount.value);
    this.demoCrudService
      .updateAccount(this.getDemoAccountId, this.updateDemoAccount.value)
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
          console.log('Data updated successfully');
          this.ngZone.run(() => {
            console.log('Navigating to account-list');
            this.router.navigateByUrl('/demo/accounts');
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
