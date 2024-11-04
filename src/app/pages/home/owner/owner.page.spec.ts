import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OwnerPage } from './owner.page';

describe('OwnerPage', () => {
  let component: OwnerPage;
  let fixture: ComponentFixture<OwnerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
