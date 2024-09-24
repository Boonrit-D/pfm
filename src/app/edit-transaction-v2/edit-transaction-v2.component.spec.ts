import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionV2Component } from './edit-transaction-v2.component';

describe('EditTransactionV2Component', () => {
  let component: EditTransactionV2Component;
  let fixture: ComponentFixture<EditTransactionV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTransactionV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTransactionV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
