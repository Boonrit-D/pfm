import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAccountDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DemoAccountDashboardComponent;
  let fixture: ComponentFixture<DemoAccountDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoAccountDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoAccountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
