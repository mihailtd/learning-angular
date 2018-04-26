import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPopularStatsComponent } from './book-popular-stats.component';

describe('BookPopularStatsComponent', () => {
  let component: BookPopularStatsComponent;
  let fixture: ComponentFixture<BookPopularStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPopularStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPopularStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
