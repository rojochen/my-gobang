import { TestBed, inject } from '@angular/core/testing';

import { CanvaseRenderService } from './canvase-render.service';

describe('CanvaseRenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanvaseRenderService]
    });
  });

  it('should be created', inject([CanvaseRenderService], (service: CanvaseRenderService) => {
    expect(service).toBeTruthy();
  }));
});
