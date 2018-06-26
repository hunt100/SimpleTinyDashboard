import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAdderComponent } from './text-adder.component';

describe('TextAdderComponent', () => {
  let component: TextAdderComponent;
  let fixture: ComponentFixture<TextAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
