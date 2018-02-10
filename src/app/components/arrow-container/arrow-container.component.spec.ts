import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowContainerComponent } from './arrow-container.component';

describe('ArrowContainerComponent', () => {
  let component: ArrowContainerComponent;
  let fixture: ComponentFixture<ArrowContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrowContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
