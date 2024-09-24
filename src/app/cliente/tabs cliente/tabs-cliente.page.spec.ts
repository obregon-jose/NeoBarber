import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TabsClientePage } from './tabs-cliente.page';

describe('TabsPage', () => {
  let component: TabsClientePage;
  let fixture: ComponentFixture<TabsClientePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsClientePage],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
