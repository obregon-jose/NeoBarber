import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeconfirmationPage } from './codeconfirmation.page';

describe('CodeconfirmationPage', () => {
  let component: CodeconfirmationPage;
  let fixture: ComponentFixture<CodeconfirmationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeconfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
