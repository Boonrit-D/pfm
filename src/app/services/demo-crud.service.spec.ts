import { TestBed } from '@angular/core/testing';

import { DemoCrudService } from './demo-crud.service';

describe('DemoCrudService', () => {
  let service: DemoCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
