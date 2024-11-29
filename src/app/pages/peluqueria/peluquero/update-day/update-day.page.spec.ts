import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateDayPage } from './update-day.page';

describe('UpdateDayPage', () => {
  let component: UpdateDayPage;
  let fixture: ComponentFixture<UpdateDayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
