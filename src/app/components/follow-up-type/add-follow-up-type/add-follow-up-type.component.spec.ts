import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFollowUpTypeComponent } from './add-follow-up-type.component';

describe('AddFollowUpTypeComponent', () => {
  let component: AddFollowUpTypeComponent;
  let fixture: ComponentFixture<AddFollowUpTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFollowUpTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFollowUpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
