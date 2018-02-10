import { TestBed, inject } from '@angular/core/testing';

import { SalutationService } from './salutation.service';

describe('SalutationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalutationService]
    });
  });

  it('should be created', inject([SalutationService], (service: SalutationService) => {
    expect(service).toBeTruthy();
  }));
});
