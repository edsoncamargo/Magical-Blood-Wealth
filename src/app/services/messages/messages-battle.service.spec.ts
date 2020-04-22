import { TestBed } from '@angular/core/testing';

import { MessagesBattleService } from './messages-battle.service';

describe('MessagesBattleService', () => {
  let service: MessagesBattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesBattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
