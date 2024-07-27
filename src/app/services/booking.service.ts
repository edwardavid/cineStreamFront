import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Booking } from '../interfaces/booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  url: string = 'http://localhost:4040/api/bookings';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getBookingsByUserId(userId: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.get(`${this.url}/user/${userId}`, { headers });
  }

  getBookings(): Observable<Booking[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.get<Booking[]>(this.url, { headers });
  }

  saveMovieBooking(
    movieId: string,
    sDate: string,
    eDate: string,
    price: number,
    
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    

    return this.http.post(this.url, {
      type: 'movie',
      item: movieId,
      startDate: sDate,
      endDate: eDate,
      price: price,
      
    }, {headers});
  }

  saveSeriesBooking(
    seriesId: string,
    sDate: string,
    eDate: string,
    price: number,
    
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    

    return this.http.post(this.url, {
      type: 'serie',
      item: seriesId,
      startDate: sDate,
      endDate: eDate,
      price: price,
      
    }, {headers});
  }


  deleteBooking(bookingId: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.delete(`${this.url}/${this.authService.user?.id}/${bookingId}`,{headers})
  }

  updateBooking(bookingId: string, startDate: string,  endDate: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
   return this.http.patch<Booking>(`${this.url}/${this.authService.user?.id}/${bookingId}`, {
      startDate,
      endDate,
    }, { headers });
  }
}
  