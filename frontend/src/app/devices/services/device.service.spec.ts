import { TestBed } from '@angular/core/testing';
import { DeviceService } from './device.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

describe('DeviceService', () => {
  let service: DeviceService;
  let httpSpy: jasmine.SpyObj<HttpClient>;  
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DeviceService,
        { provide: HttpClient }
      ]
    });
    service = TestBed.inject(DeviceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test removeDevice', () => {

    const gatewayId = "5efa27b8577418e686b64eb9";
    const deviceId = "5efa27b8577418e686b64eb9";
    const expectedResponse = new HttpResponse({status: 204, statusText: 'No Content', body: ''});

    service.removeDevice(gatewayId, deviceId).subscribe(data => expect(data).toEqual(''));

    const req = httpTestingController.expectOne(`${environment.URL_API}/device/${gatewayId}/${deviceId}`);

    expect(req.request.method).toEqual('DELETE');

    req.event(expectedResponse);

  });

  it('should test removeDevice for network error', () => {

    const gatewayId = "5efa27b8577418e686b64eb9";
    const deviceId = "5efa27b8577418e686b64eb9";
    const emsg = 'simulated network error';

    service.removeDevice(gatewayId, deviceId).subscribe(() => {}, (reason: string) => {
      expect(reason).toBe('An error occurred: simulated network error');
    });

    const req = httpTestingController.expectOne(`${environment.URL_API}/device/${gatewayId}/${deviceId}`);

    const mockError = new ErrorEvent('Network error', {
      message: emsg
    });
  
    req.error(mockError)

  });
});
