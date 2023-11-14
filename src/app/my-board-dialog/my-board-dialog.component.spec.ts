import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBoardDialogComponent } from './my-board-dialog.component';

describe('MyBoardDialogComponent', () => {
  let component: MyBoardDialogComponent;
  let fixture: ComponentFixture<MyBoardDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBoardDialogComponent]
    });
    fixture = TestBed.createComponent(MyBoardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
