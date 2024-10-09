import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IrregistroPage } from './irregistro.page';

describe('IrregistroPage', () => {
  let component: IrregistroPage;
  let fixture: ComponentFixture<IrregistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IrregistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
