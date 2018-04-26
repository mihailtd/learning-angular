import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookExpanseComponent } from './book-expanse.component';

describe('BookExpanseComponent', () => {
  let component: BookExpanseComponent;
  let fixture: ComponentFixture<BookExpanseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookExpanseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookExpanseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
