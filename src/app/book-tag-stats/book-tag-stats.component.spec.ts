import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTagStatsComponent } from './book-tag-stats.component';

describe('BookTagStatsComponent', () => {
  let component: BookTagStatsComponent;
  let fixture: ComponentFixture<BookTagStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTagStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTagStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
