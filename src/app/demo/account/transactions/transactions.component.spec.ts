import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoTransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let component: DemoTransactionsComponent;
  let fixture: ComponentFixture<DemoTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
