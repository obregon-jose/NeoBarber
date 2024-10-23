import { TestBed } from '@angular/core/testing';

import { RestablecerContraseñaService } from './restablecer-contraseña.service';

describe('RestablecerContraseñaService', () => {
  let service: RestablecerContraseñaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestablecerContraseñaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
