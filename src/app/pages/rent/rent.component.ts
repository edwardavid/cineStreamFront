import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DivisaPipe } from './../../pipes/divisa.pipe';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { SeriesService } from '../../services/series.service';
import { BookingService } from '../../services/booking.service';
import { BookingFormData } from '../../interfaces/booking-form-data';
import { Series } from '../../interfaces/series';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [DivisaPipe, ReactiveFormsModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnDestroy  {
  parametro: string | null = null;
  movie: Movie | null = null;
  series: Series | null = null;
  form: FormGroup;
  safeUrl!: SafeResourceUrl;


  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private seriesService: SeriesService,
    private builder: FormBuilder,
    public authService: AuthService,
    private cookieService: CookieService,
    private bookingService: BookingService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    let data: BookingFormData = { startDate: null, endDate: null };
    if (cookieService.check("booking-form-data")) {
      data = JSON.parse(cookieService.get("booking-form-data"));
    }
    this.form = builder.group({
      "fechaInicio": new FormControl(data.startDate, [Validators.required]),
      "fechaFin": new FormControl(data.endDate, [Validators.required]),
    });

    route.paramMap.subscribe((params) => {
      this.parametro = params.get('id');
      if (this.parametro) {
        this.loadData(this.parametro);
      }
    });
  }

  private loadData(id: string): void {
    if (!id) {
      return;
    }
    this.movieService.getById(id).subscribe({
      next: (response) => {
        this.movie = response as Movie;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailer!);

      }, 
      error: () => {
        this.movie = null;
      }
    });

    this.seriesService.getById(id).subscribe({
      next: (response) => {
        this.series = response as Series;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.series.trailer!);
      },
      error: () => {
        this.series = null;
      }
    });
  }

  ngOnDestroy(): void {
    const data: BookingFormData = {
      endDate: this.form.value.fechaFin,
      startDate: this.form.value.fechaInicio,
      
    };
    this.cookieService.set("booking-form-data", JSON.stringify(data));
  }

  public get numDias(): number {
    const fechaini = new Date(this.form.value.fechaInicio);
    const fechafin = new Date(this.form.value.fechaFin);
    const millisDif = fechafin.getTime() - fechaini.getTime();
    const dias = millisDif / 1000 / 60 / 60 / 24;
    return dias < 0 ? 0 : dias;
  }

  enviarPelicula(): void {
    if (this.movie) {
      this.bookingService.saveMovieBooking(this.movie._id, this.form.value.fechaInicio,
        this.form.value.fechaFin, this.numDias * this.movie.pricePerDay).subscribe({
          next: () => {
            Swal.fire({
              title: "Reserva realizada",
              text: `Tu reserva de ${this.movie?.title} está lista`,
              icon: "success",
              timer: 2000,
              didClose: () => {
                this.router.navigateByUrl("/me/my-bookings");
              }
            });
          },
          error: () => {
            Swal.fire({
              title: "Oops",
              text: "Ha ocurrido un error con tu reserva",
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
    }
  }

  enviarSerie(): void {
    if (this.series) {
      this.bookingService.saveSeriesBooking(this.series._id, this.form.value.fechaInicio,
        this.form.value.fechaFin, this.numDias * this.series.pricePerDay).subscribe({
          next: () => {
            Swal.fire({
              title: "Reserva realizada",
              text: `Tu reserva de ${this.series?.title} está lista`,
              icon: "success",
              timer: 2000,
              didClose: () => {
                this.router.navigateByUrl("/me/my-bookings");
              }
            });
          },
          error: () => {
            Swal.fire({
              title: "Oops",
              text: "Ha ocurrido un error con tu reserva",
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
    }
  }
}
