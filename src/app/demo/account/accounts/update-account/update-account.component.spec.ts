import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDemoAccountComponent } from './update-account.component';

describe('UpdateAccountComponent', () => {
  let component: UpdateDemoAccountComponent;
  let fixture: ComponentFixture<UpdateDemoAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDemoAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDemoAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
