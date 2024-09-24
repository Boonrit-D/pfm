import { Component, OnInit } from '@angular/core';

interface Account {
  id: string;
  accountName: string;
  balance: number;
  currency: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  accounts: Account[] = [];
  
  addAccount(): void {
    // const newAccount: Account = {
    //   id: (this.accounts.length + 1).toString(),
    //   accountName: 'บัญชีใหม่',
    //   balance: 0.00,
    //   currency: 'THB'
    // };
    // this.accounts.push(newAccount);
  }

}
