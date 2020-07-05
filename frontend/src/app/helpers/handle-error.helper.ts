import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export function handleError(error: HttpErrorResponse): Observable<never> {
  const message =
    error.error instanceof ErrorEvent
      ? `An error occurred: ${error.error.message}`
      : error.error.message ? error.error.message : 'Something is wrong. Try it later o contact with system admin.' ;

  return throwError(message);
}
