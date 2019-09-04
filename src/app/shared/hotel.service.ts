import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  hotels: any = [];
// Base url
  //baseurl = 'https://makehotelreservationsrestapi20190902100457.azurewebsites.net';
  baseurl = 'https://localhost:5001';
  constructor(private http: HttpClient) { }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // GET
  GetHotels(): Observable<Object> {
    return this.http.get<Object>(this.baseurl + '/api/hotel')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

    // POST
    CreateHotel(data: any): Observable<Object> {
      return this.http.post<Object>(this.baseurl + '/api/hotel', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    } 

  // Error handling
  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }


}



