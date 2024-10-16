import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoTransactionsForAccountComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let component: DemoTransactionsForAccountComponent;
  let fixture: ComponentFixture<DemoTransactionsForAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoTransactionsForAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoTransactionsForAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
