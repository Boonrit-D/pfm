import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: AccountDashboardComponent;
  let fixture: ComponentFixture<AccountDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
