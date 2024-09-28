import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTransactionComponent } from './account-transaction.component';

describe('AccountTransactionComponent', () => {
  let component: AccountTransactionComponent;
  let fixture: ComponentFixture<AccountTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
