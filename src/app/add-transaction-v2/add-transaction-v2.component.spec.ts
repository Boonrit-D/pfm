import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionV2Component } from './add-transaction-v2.component';

describe('AddTransactionV2Component', () => {
  let component: AddTransactionV2Component;
  let fixture: ComponentFixture<AddTransactionV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTransactionV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTransactionV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
