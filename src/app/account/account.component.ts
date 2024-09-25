import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';

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
  styleUrl: './account.component.css'
})


export class AccountComponent {

  accounts: any = [];
  dropdownOpen: boolean[] = [];

  constructor(private CrudService: CrudService) {}
  
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

  editAccount(index: number) {
    console.log('Edit Account:', index); 
    this.dropdownOpen[index] = false;
  }

  deleteAccount(index: number) {
    console.log('Delete Account:', index);
    this.dropdownOpen[index] = false;
  }
  
}
