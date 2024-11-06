import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyCodePage } from './verify-code.page';

describe('VerifyCodePage', () => {
  let component: VerifyCodePage;
  let fixture: ComponentFixture<VerifyCodePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
