import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDemoAccountComponent } from './create-account.component';

describe('CreateDemoAccountComponent', () => {
  let component: CreateDemoAccountComponent;
  let fixture: ComponentFixture<CreateDemoAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDemoAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDemoAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
