import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordNewPage } from './password-new.page';

describe('PasswordNewPage', () => {
  let component: PasswordNewPage;
  let fixture: ComponentFixture<PasswordNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
