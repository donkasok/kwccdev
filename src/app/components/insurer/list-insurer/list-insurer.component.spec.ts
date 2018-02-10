import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsurerComponent } from './list-insurer.component';

describe('ListInsurerComponent', () => {
  let component: ListInsurerComponent;
  let fixture: ComponentFixture<ListInsurerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInsurerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInsurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
