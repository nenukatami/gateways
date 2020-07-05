import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { handleError } from '../../helpers/handle-error.helper';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private deviceUrl = `${environment.URL_API}/device`;

  constructor(private http: HttpClient) {}

  removeDevice(gid: string, did: string): Observable<any> {
    const url = `${this.deviceUrl}/${gid}/${did}`;
    return this.http.delete(url).pipe(catchError(handleError));
  }
}
