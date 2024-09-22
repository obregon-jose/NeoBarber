import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaPage } from './fila.page';

describe('FilaPage', () => {
  let component: FilaPage;
  let fixture: ComponentFixture<FilaPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(FilaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
