import { TestBed } from '@angular/core/testing';
import { GatewayService } from './gateway.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Gateway } from '../models/gateway';
import { environment } from '../../../environments/environment';
import { Device } from 'src/app/devices/models/device';

describe('GatewayService', () => {
  let service: GatewayService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GatewayService, { provide: HttpClient }],
    });

    service = TestBed.inject(GatewayService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getGateways', () => {
    const testData: Gateway[] = [
      {
        _id: '5efa27b8577418e686b64eb9',
        name: 'Gateway 1',
        ipv: '192.168.1.3',
        serialNumber: '94-10-3001',
      },
    ];

    // make and HTTP GET request
    // when observable resolves, result should match test data
    service.getGateways().subscribe((data) => expect(data).toEqual(testData));

    // The following `expectOne()` will match the request's URL
    // if no request matched that URL `expectOne()` would throw
    const req = httpTestingController.expectOne(
      `${environment.URL_API}/gateway`
    );

    // Assert that the request is a GET
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing the above observable to resolve
    req.flush(testData);
  });

  it('should test getGateways for network error', () => {
    const emsg = 'simulated network error';

    service.getGateways().subscribe(
      () => {},
      (reason: string) => {
        expect(reason).toBe('An error occurred: simulated network error');
      }
    );

    const req = httpTestingController.expectOne(
      `${environment.URL_API}/gateway`
    );

    // Create mock ErrorEvent, raised when something goes wrong at the network level.
    // Connection timeout, DNS error, offline, etc
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
      // The rest of this is optional and not used.
      // Just showing that you could provide this too.
      filename: 'gateway.services.ts',
      lineno: 22,
      colno: 21,
    });

    // Respond with mock error
    req.error(mockError);
  });

  it('should test getDevices', () => {
    const gatewayId = '5efa27b8577418e686b64eb9';
    const testData: Device[] = [
      {
        _id: '5efa27b8577418e686b64eb9',
        uid: 10020321,
        status: false,
        dateCreated: new Date(),
        vendor: 'AT&T',
      },
    ];

    // make and HTTP GET request
    // when observable resolves, result should match test data
    service
      .getDevices(gatewayId)
      .subscribe((data) => expect(data).toEqual(testData));

    // The following `expectOne()` will match the request's URL
    // if no request matched that URL `expectOne()` would throw
    const req = httpTestingController.expectOne(
      `${environment.URL_API}/gateway/${gatewayId}/devices`
    );

    // Assert that the request is a GET
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing the above observable to resolve
    req.flush(testData);
  });

  it('should test getDevices for network error', () => {
    const gatewayId = '5efa27b8577418e686b64eb9';
    const emsg = 'simulated network error';

    service.getDevices(gatewayId).subscribe(
      () => {},
      (reason: string) => {
        expect(reason).toBe('An error occurred: simulated network error');
      }
    );

    const req = httpTestingController.expectOne(
      `${environment.URL_API}/gateway/${gatewayId}/devices`
    );

    const mockError = new ErrorEvent('Network error', {
      message: emsg,
      filename: 'gateway.services.ts',
      lineno: 22,
      colno: 21,
    });

    req.error(mockError);
  });
});
