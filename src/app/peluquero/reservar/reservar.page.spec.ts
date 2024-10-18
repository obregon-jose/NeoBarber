import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarPage } from './reservar.page';

describe('ReservarPage', () => {
  let component: ReservarPage;
  let fixture: ComponentFixture<ReservarPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ReservarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
