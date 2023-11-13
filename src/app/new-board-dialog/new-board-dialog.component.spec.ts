import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoardDialogComponent } from './new-board-dialog.component';

describe('NewBoardDialogComponent', () => {
  let component: NewBoardDialogComponent;
  let fixture: ComponentFixture<NewBoardDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBoardDialogComponent]
    });
    fixture = TestBed.createComponent(NewBoardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
