import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalutationComponent } from './add-salutation.component';

describe('AddSalutationComponent', () => {
  let component: AddSalutationComponent;
  let fixture: ComponentFixture<AddSalutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
