import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasClientePage } from './reservas-cliente.page';

describe('ReservasPage', () => {
  let component: ReservasClientePage;
  let fixture: ComponentFixture<ReservasClientePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ReservasClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
