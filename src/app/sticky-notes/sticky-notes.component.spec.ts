import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('StickyNotesComponent', () => {
  let component: StickyNotesComponent;
  let fixture: ComponentFixture<StickyNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StickyNotesComponent]
    });
    fixture = TestBed.createComponent(StickyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
