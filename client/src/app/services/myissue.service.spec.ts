import { TestBed } from '@angular/core/testing';

import { MyissueService } from './myissue.service';

describe('MyissueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyissueService = TestBed.get(MyissueService);
    expect(service).toBeTruthy();
  });
});
