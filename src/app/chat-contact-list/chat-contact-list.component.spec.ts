import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContactListComponent } from './chat-contact-list.component';

describe('ChatContactListComponent', () => {
  let component: ChatContactListComponent;
  let fixture: ComponentFixture<ChatContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatContactListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
