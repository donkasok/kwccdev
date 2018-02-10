import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFollowUpTypeComponent } from './list-follow-up-type.component';

describe('ListFollowUpTypeComponent', () => {
  let component: ListFollowUpTypeComponent;
  let fixture: ComponentFixture<ListFollowUpTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFollowUpTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFollowUpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
