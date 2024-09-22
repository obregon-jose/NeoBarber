import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TabsPeluqueroPage } from './tabs-peluquero.page';

describe('TabsPage', () => {
  let component: TabsPeluqueroPage;
  let fixture: ComponentFixture<TabsPeluqueroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsPeluqueroPage],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPeluqueroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
