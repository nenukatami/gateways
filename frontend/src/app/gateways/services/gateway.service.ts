import { Injectable } from '@angular/core';
import { Gateway } from '../models/gateway';
import { Device } from '../../devices/models/device';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { handleError } from '../../helpers/handle-error.helper';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  private gatewayUrl = `${environment.URL_API}/gateway`;

  constructor(private http: HttpClient) {}

  getGateways(): Observable<Gateway[]> {
    return this.http
      .get<Gateway[]>(this.gatewayUrl)
      .pipe(catchError(handleError));
  }

  getDevices(id: string): Observable<Device[]> {
    const url = `${this.gatewayUrl}/${id}/devices`;
    return this.http.get<Device[]>(url).pipe(catchError(handleError));
  }
}
