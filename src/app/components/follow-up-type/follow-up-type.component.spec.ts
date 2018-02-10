import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpTypeComponent } from './follow-up-type.component';

describe('FollowUpTypeComponent', () => {
  let component: FollowUpTypeComponent;
  let fixture: ComponentFixture<FollowUpTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
