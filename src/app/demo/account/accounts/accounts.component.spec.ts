import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAccountsComponent } from './accounts.component';

describe('DemoAccountsComponent', () => {
  let component: DemoAccountsComponent;
  let fixture: ComponentFixture<DemoAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
