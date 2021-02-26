import { TestBed } from '@angular/core/testing';

import { PelisService } from './pelis.service';

describe('PelisService', () => {
  let service: PelisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PelisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
