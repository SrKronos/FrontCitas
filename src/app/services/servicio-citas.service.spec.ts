import { TestBed } from '@angular/core/testing';

import { ServicioCitasService } from './servicio-citas.service';

describe('ServicioCitasService', () => {
  let service: ServicioCitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioCitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
