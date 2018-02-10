import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGenderComponent } from './list-gender.component';

describe('ListGenderComponent', () => {
  let component: ListGenderComponent;
  let fixture: ComponentFixture<ListGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
