import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDemoTransactionComponent } from './update-transaction.component';

describe('UpdateTransactionComponent', () => {
  let component: UpdateDemoTransactionComponent;
  let fixture: ComponentFixture<UpdateDemoTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDemoTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDemoTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
