import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountTransactionComponent } from './edit-account-transaction.component';

describe('EditAccountTransactionComponent', () => {
  let component: EditAccountTransactionComponent;
  let fixture: ComponentFixture<EditAccountTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAccountTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAccountTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
