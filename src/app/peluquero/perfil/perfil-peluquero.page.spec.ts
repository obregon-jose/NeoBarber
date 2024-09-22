import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPeluqueroPage } from './perfil-peluquero.page';

describe('Tab4Page', () => {
  let component: PerfilPeluqueroPage;
  let fixture: ComponentFixture<PerfilPeluqueroPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(PerfilPeluqueroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
