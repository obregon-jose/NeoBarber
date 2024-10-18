import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarBarberoPage } from './seleccionarbarbero.page';

describe('BarberoPage', () => {
  let component: SeleccionarBarberoPage;
  let fixture: ComponentFixture<SeleccionarBarberoPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SeleccionarBarberoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
