import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AddDeviceService } from './add-device.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment';
import { Device } from '../../../models/device';

describe('AddDeviceService', () => {
  let service: AddDeviceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddDeviceService, { provide: HttpClient }],
    });
    service = TestBed.inject(AddDeviceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test addDevice', () => {
    const testData: Device = {
      _id: '5efa27b8577418e686b64eb9',
      dateCreated: new Date(),
      status: false,
      uid: 234,
      vendor: 'vendor',
    };
    const gatewayId = '5efa27b8577418e686b64eb9';

    service
      .addDevice(gatewayId, testData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne(
      `${environment.URL_API}/device/${gatewayId}`
    );

    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it('should test addDevice for network error', () => {
    const testData: Device = {
      _id: '5efa27b8577418e686b64eb9',
      dateCreated: new Date(),
      status: false,
      uid: 234,
      vendor: 'vendor',
    };
    const gatewayId = '5efa27b8577418e686b64eb9';
    const emsg = 'simulated network error';

    service.addDevice(gatewayId, testData).subscribe(
      () => {},
      (reason: string) => {
        expect(reason).toBe('An error occurred: simulated network error');
      }
    );

    const req = httpTestingController.expectOne(
      `${environment.URL_API}/device/${gatewayId}`
    );

    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });

    req.error(mockError);
  });
});
