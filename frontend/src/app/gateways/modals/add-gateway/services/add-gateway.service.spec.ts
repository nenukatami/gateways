import { TestBed } from '@angular/core/testing';
import { AddGatewayService } from './add-gateway.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Gateway } from 'src/app/gateways/models/gateway';
import { environment } from '../../../../../environments/environment';

describe('AddGatewayService', () => {
  let service: AddGatewayService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddGatewayService, { provide: HttpClient }],
    });
    service = TestBed.inject(AddGatewayService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test addGateway', () => {
    const testData: Gateway = {
      _id: '5efa27b8577418e686b64eb9',
      name: 'Gateway 1',
      ipv: '192.168.1.3',
      serialNumber: '94-10-3001',
    };

    // make and HTTP GET request
    // when observable resolves, result should match test data
    service
      .addGateway(testData)
      .subscribe((data) => expect(data).toEqual(testData));

    // The following `expectOne()` will match the request's URL
    // if no request matched that URL `expectOne()` would throw
    const req = httpTestingController.expectOne(
      `${environment.URL_API}/gateway`
    );

    // Assert that the request is a GET
    expect(req.request.method).toEqual('POST');

    // Respond with mock data, causing the above observable to resolve
    req.flush(testData);
  });

  it('should test addGateway for network error', () => {
    const testData: Gateway = {
      _id: '5efa27b8577418e686b64eb9',
      name: 'Gateway 1',
      ipv: '192.168.1.3',
      serialNumber: '94-10-3001',
    };
    const emsg = 'simulated network error';

    service.addGateway(testData).subscribe(
      () => {},
      (reason: string) => {
        expect(reason).toBe('An error occurred: simulated network error');
      }
    );

    const req = httpTestingController.expectOne(
      `${environment.URL_API}/gateway`
    );

    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });

    req.error(mockError);
  });
});
