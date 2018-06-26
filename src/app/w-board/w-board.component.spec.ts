import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WBoardComponent } from './w-board.component';

describe('WBoardComponent', () => {
  let component: WBoardComponent;
  let fixture: ComponentFixture<WBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
