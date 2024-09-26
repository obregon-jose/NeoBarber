import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangepasswordPage } from './changepassword.page';

describe('ChangepasswordPage', () => {
  let component: ChangepasswordPage;
  let fixture: ComponentFixture<ChangepasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
