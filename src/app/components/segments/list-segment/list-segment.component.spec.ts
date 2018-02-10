import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSegmentComponent } from './list-segment.component';

describe('ListSegmentComponent', () => {
  let component: ListSegmentComponent;
  let fixture: ComponentFixture<ListSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
