import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarberPage } from './barber.page';

describe('BarberPage', () => {
  let component: BarberPage;
  let fixture: ComponentFixture<BarberPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
