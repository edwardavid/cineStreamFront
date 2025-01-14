import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../interfaces/booking';
import { BookingService } from '../../../services/booking.service';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { AuthService } from '../../../services/auth.service';
import Swal from "sweetalert2";
import { CanCancelPipe } from '../../../pipes/can-cancel.pipe';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [FormatDatePipe, DivisaPipe, CanCancelPipe],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent {
  bookings: Booking[] = [];


  constructor(private bookingService: BookingService, private authService: AuthService){
    this.bookingService.getBookings().subscribe({
      next: (response)=>{
        this.bookings = response as Booking[]
        console.log(this.bookings)
      },
      error: ()=>{

      }
    })
  }

  eliminar(bookingId: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.deleteBooking(bookingId).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Reserva eliminada!",
              text: "Tu reserva ha sido eliminada correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });

            this.bookings = this.bookings.filter(x => x._id !== bookingId);
          },
          error: () => {
            Swal.fire({
              title: "Oops!",
              text: "Ha ocurrido un error",
              icon: "error",
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }

  editar(bookingId: string) {
    console.log('Editar reserva:', bookingId)
    const reservaEditar: Booking | undefined = this.bookings.find(x => x._id === bookingId);
    if (reservaEditar) {
      console.log('Editar reserva:', reservaEditar)
      let title = '';
      if (reservaEditar.serie) {
        title = reservaEditar.serie.title;
      } else {
        title = '';
      }
      const movieTitle = reservaEditar.movie?.title ?? '';
      const serieTitle = reservaEditar.serie?.title ?? '';
     
      Swal.fire({
        title: `Editar reserva de: <br> ${movieTitle} ${title}`,
        
        html: `<div>
          <div>
            <label class="form-label">Fecha inicio</label>
            <input id="startDate" type="date" class="form-control" value="${reservaEditar.startDate}">
          </div>
          <div>
            <label class="form-label">Fecha fin</label>
            <input id="endDate" type="date" class="form-control" value="${reservaEditar.endDate}">
          </div>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'Guardar cambios',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
          const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
          if (!startDate || new Date(startDate) < new Date()) {
            Swal.showValidationMessage('La fecha de inicio no puede ser anterior a la fecha actual o estar vacía.');
            return null;
        }
        if (!endDate) {
            Swal.showValidationMessage('La fecha de fin no puede estar vacía.');
            return null;
        }
          return { startDate, endDate };
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const { startDate, endDate } = result.value;
          this.bookingService.updateBooking(bookingId, startDate, endDate).subscribe({
            next: () => {
              Swal.fire({
                title: '¡Reserva actualizada!',
                text: 'La reserva ha sido actualizada correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              });
              reservaEditar.startDate = startDate;
              reservaEditar.endDate = endDate;
            },
            error: () => {
              Swal.fire({
                title: 'Oops!',
                text: 'Ha ocurrido un error al actualizar la reserva',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
        }
      });
    } else {
      console.error('No se encontró la reserva a editar')
    }
  }
}