import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsuranceTypeComponent } from './list-insurance-type.component';

describe('ListInsuranceTypeComponent', () => {
  let component: ListInsuranceTypeComponent;
  let fixture: ComponentFixture<ListInsuranceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInsuranceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInsuranceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
