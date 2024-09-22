import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasPeluqueroPage } from './reservas-peluquero.page';

describe('Tab3Page', () => {
  let component: ReservasPeluqueroPage;
  let fixture: ComponentFixture<ReservasPeluqueroPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ReservasPeluqueroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
