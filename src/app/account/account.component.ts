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
  styleUrl: './account.component.css',
})
export class AccountComponent {
  accounts: any = [];
  dropdownOpen: boolean[] = [];

  constructor(private CrudService: CrudService) {}

  ngOnInit(): void {

    // ตรวจสอบว่าเคยรีเฟรชหรือยัง
    const hasRefreshed = localStorage.getItem('hasRefreshed');

    // ถ้ายังไม่เคยรีเฟรช ให้ทำการรีเฟรชและบันทึกสถานะ
    if (!hasRefreshed) {
      localStorage.setItem('hasRefreshed', 'true'); // บันทึกสถานะว่าเคยรีเฟรชแล้ว
      window.location.reload(); // ทำการรีเฟรช
    }

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
