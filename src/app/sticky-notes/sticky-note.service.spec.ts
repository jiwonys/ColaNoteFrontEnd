import { TestBed } from '@angular/core/testing';

import { StickyNoteService } from './sticky-note.service';

describe('StickyNoteService', () => {
  let service: StickyNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StickyNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
