import { TestBed } from '@angular/core/testing';

import { UpdateDayService } from './update-day.service';

describe('UpdateDayService', () => {
  let service: UpdateDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
