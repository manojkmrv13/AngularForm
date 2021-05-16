import { TestBed, inject } from '@angular/core/testing';

import { PlaedgeSupportService } from './plaedge-support.service';

describe('PlaedgeSupportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaedgeSupportService]
    });
  });

  it('should be created', inject([PlaedgeSupportService], (service: PlaedgeSupportService) => {
    expect(service).toBeTruthy();
  }));
});
