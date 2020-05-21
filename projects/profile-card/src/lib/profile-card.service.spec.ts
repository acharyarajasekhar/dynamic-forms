import { TestBed } from '@angular/core/testing';

import { ProfileCardService } from './profile-card.service';

describe('ProfileCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileCardService = TestBed.get(ProfileCardService);
    expect(service).toBeTruthy();
  });
});
