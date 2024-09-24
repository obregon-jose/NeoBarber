import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassrecoveryPage } from './passrecovery.page';

describe('PassrecoveryPage', () => {
  let component: PassrecoveryPage;
  let fixture: ComponentFixture<PassrecoveryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PassrecoveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
