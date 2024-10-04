import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { isPlatformBrowser } from '@angular/common';

interface Account {
  id: string;
  accountName: string;
  description: string;
  balance: number;
  currency: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  accounts: any = [];
  dropdownOpen: boolean[] = [];

  constructor(
    private CrudService: CrudService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    // Get all accounts
    this.CrudService.GetAccounts().subscribe((res) => {
      console.log(res);
      this.accounts = res;
    });
  }

  toggleDropdown(index: number) {
    this.dropdownOpen[index] = !this.dropdownOpen[index];
  }

  deleteAccount(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.CrudService.deleteAccount(id).subscribe((res) => {
        this.accounts.splice(i, 1);
      });
    }
  }
}
