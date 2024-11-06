import { TestBed } from '@angular/core/testing';

import { BarbersService } from './barbers.service';

describe('BarbersService', () => {
  let service: BarbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
