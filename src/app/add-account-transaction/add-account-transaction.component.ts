import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { CrudService } from './../service/crud.service';

@Component({
  selector: 'app-add-account-transaction',
  templateUrl: './add-account-transaction.component.html',
  styleUrl: './add-account-transaction.component.css'
})
export class AddAccountTransactionComponent implements OnInit {

  // Define date
  currentDateTime: string;

  // Category
  categories: string[] = ['รายได้', 'รายจ่าย']; // หมวดหมู่เริ่มต้น
  newCategory: string = ''; // ตัวแปรสำหรับเก็บหมวดหมู่ใหม่

  // Account
  account: any = [];
  getId: any;
  transactionForm: FormGroup;

  constructor(
    private crudService: CrudService,
    private activatedRouter: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
  ) {

    // Get ID
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');

    this.crudService.GetAccount(this.getId).subscribe((res) => {
      this.account = res;
    });

    // Date
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // รูปแบบสำหรับ datetime-local คือ YYYY-MM-DDTHH:MM
    this.currentDateTime = `${yyyy}-${mm}-${dd}T${hours}:${minutes}:${seconds}`;

    // 
    this.transactionForm = this.formBuilder.group({
      category: ['', Validators.required],
      amount: [ , Validators.required],
      description: [''],
      date: [this.currentDateTime]
    });
  }

  ngOnInit(): void {

    // สมมุติว่ามีการดึงข้อมูลหมวดหมู่เก่าจาก API หรือที่ไหนสักแห่ง
    this.fetchOldCategories();

  }

  fetchOldCategories() {
    // สมมุติว่ามีการดึงข้อมูลหมวดหมู่เก่าจาก API หรือที่ไหนสักแห่ง
    const oldCategories = ['หมวดหมู่ 1', 'หมวดหมู่ 2', 'หมวดหมู่ 3'];
    this.categories = [...this.categories, ...oldCategories];
  }

  onSubmit(): any {
    this.crudService.AddTransactionOfAccount(this.transactionForm.value, this.getId).subscribe({
      next: () => {
        console.log('data added successfully');
        this.ngZone.run(() => this.router.navigateByUrl(`/account/dashboard/${this.getId}`));
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      },
    });
  }

}
