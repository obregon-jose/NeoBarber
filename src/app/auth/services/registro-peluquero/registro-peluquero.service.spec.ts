import { TestBed } from '@angular/core/testing';

import { RegistroPeluqueroService } from './registro-peluquero.service';

describe('RegistroPeluqueroService', () => {
  let service: RegistroPeluqueroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroPeluqueroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
