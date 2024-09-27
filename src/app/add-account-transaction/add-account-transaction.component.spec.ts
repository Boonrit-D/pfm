import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountTransactionComponent } from './add-account-transaction.component';

describe('AddAccountTransactionComponent', () => {
  let component: AddAccountTransactionComponent;
  let fixture: ComponentFixture<AddAccountTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAccountTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccountTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
