import { TestBed, inject } from '@angular/core/testing';

import { GobangInfoService } from './gobang-info.service';

describe('GobangInfoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GobangInfoService]
    });
  });

  it('should be created', inject([GobangInfoService], (service: GobangInfoService) => {
    expect(service).toBeTruthy();
  }));
});
