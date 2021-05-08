import { TestBed } from '@angular/core/testing';

import { ItemEventListenerService } from './item-event-listener.service';

describe('ItemEventListenerService', () => {
  let service: ItemEventListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemEventListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
