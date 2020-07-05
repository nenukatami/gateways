import { Injectable } from '@angular/core';
import { Device } from '../../../models/device';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { handleError } from '../../../../helpers/handle-error.helper';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddDeviceService {
  private deviceUrl = `${environment.URL_API}/device`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  addDevice(id: string, device: Device): Observable<Device> {
    const url = `${this.deviceUrl}/${id}`;
    return this.http
      .post<Device>(url, device, this.httpOptions)
      .pipe(catchError(handleError));
  }
}
