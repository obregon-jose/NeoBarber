import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaYHoraPage } from './fechayhora.page';

describe('FechaYHoraPage', () => {
  let component: FechaYHoraPage;
  let fixture: ComponentFixture<FechaYHoraPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(FechaYHoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
