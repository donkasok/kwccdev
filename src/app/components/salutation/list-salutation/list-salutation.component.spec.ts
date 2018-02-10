import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalutationComponent } from './list-salutation.component';

describe('ListSalutationComponent', () => {
  let component: ListSalutationComponent;
  let fixture: ComponentFixture<ListSalutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSalutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
