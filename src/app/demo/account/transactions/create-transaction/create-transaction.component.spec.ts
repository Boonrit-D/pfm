import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDemoTransactionComponent } from './create-transaction.component';

describe('CreateTransactionComponent', () => {
  let component: CreateDemoTransactionComponent;
  let fixture: ComponentFixture<CreateDemoTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDemoTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDemoTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
