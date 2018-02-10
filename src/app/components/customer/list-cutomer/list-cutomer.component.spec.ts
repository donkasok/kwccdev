import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCutomerComponent } from './list-cutomer.component';

describe('ListCutomerComponent', () => {
  let component: ListCutomerComponent;
  let fixture: ComponentFixture<ListCutomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCutomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCutomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
