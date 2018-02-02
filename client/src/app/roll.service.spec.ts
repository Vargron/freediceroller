import { TestBed, inject } from '@angular/core/testing';

import { RollService } from './roll.service';

describe('RollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RollService]
    });
  });

  it('should be created', inject([RollService], (service: RollService) => {
    expect(service).toBeTruthy();
  }));
});
