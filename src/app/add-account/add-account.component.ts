import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from './../service/crud.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css'
})
export class AddAccountComponent {

  accountForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ){
    this.accountForm = this.formBuilder.group({
      accountName: [''],
      currency: [''],
      balance: 0,
      description: ['']
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): any {
    this.crudService.AddAccount(this.accountForm.value).subscribe({
      next: () => {
        console.log('data added successfully');
        this.ngZone.run(() => this.router.navigateByUrl('/account'));
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      },
    });
  }

}
