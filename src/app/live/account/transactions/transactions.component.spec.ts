import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsForAccountComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let component: TransactionsForAccountComponent;
  let fixture: ComponentFixture<TransactionsForAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsForAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsForAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
