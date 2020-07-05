import { Injectable } from '@angular/core';
import { Gateway } from '../../../models/gateway';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { handleError } from '../../../../helpers/handle-error.helper';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddGatewayService {
  private gatewayUrl = `${environment.URL_API}/gateway`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  addGateway(gateway: Gateway): Observable<Gateway> {
    return this.http
      .post<Gateway>(this.gatewayUrl, gateway, this.httpOptions)
      .pipe(catchError(handleError));
  }
}
