import { TestBed, inject } from '@angular/core/testing';

import { MockApiService } from './mock-api.service';

describe('MockApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockApiService]
    });
  });

  it('should be created', inject([MockApiService], (service: MockApiService) => {
    expect(service).toBeTruthy();
  }));
});
