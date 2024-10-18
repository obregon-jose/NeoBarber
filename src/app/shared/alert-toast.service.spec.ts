import { TestBed } from '@angular/core/testing';

import { AlertToastService } from './alert-toast.service';

describe('AlertToastService', () => {
  let service: AlertToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
