import { Component } from '@angular/core';
import { Movie } from '../../../interfaces/movie';
import { MovieService } from '../../../services/movie.service';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterMoviesPipe } from '../../../pipes/filter-movies.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [DivisaPipe, RouterModule, FormsModule, FilterMoviesPipe],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
  movie: Movie[] = [];
  filtro: string = '';
  selectedMovie: Movie | null = null;

  constructor(private movieService: MovieService) {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getAll().subscribe({
      next: (response) => {
        this.movie = response as Movie[];
      },
      error: (error) => {
        console.error('Error al cargar las peliculas', error);
      }
    });
  }

  editar(movie: string) {
    console.log('ID de la pelicula a editar:', movie);
    const movies = this.movie.find(v => v._id === movie);
    console.log('pelicula encontrado:', movie);

    if (movies) {
        Swal.fire({
            title: `Editar Pelicula ${movies.title}`,
            html: `<div>
              <div>
                <label class="form-label">Titulo</label>
                <input id="brand" type="text" class="form-control" value="${movies.title}">
              </div>

              <div>
                <label class="form-label">Director</label>
                <input id="brand" type="text" class="form-control" value="${movies.director}">
              </div>

              <div>
                <label class="form-label">Actores</label>
                <input id="brand" type="text" class="form-control" value="${movies.actors}">
              </div>

              <div>
                <label class="form-label">Año</label>
                <input id="year" type="number" class="form-control" value="${movies.year}">
              </div>

              <div>
                <label class="form-label">Género</label>
                <input id="brand" type="text" class="form-control" value="${movies.thema}">
              </div>
              
              <div>
                <label class="form-label">Sinopsis</label>
                <input id="description" type="text" class="form-control" value="${movies.synopsis}">
              </div>

              <div>
                <label class="form-label">Imagen</label>
                <input id="brand" type="text" class="form-control" value="${movies.image}">
              </div>

              <div>
                <label class="form-label">Valoración</label>
                <input id="brand" type="text" class="form-control" value="${movies.valoration}">
              </div>

              <div>
                <label class="form-label">Edad</label>
                <input id="brand" type="text" class="form-control" value="${movies.ageRestriction}">
              </div>

              <div>
                <label class="form-label">Trailer</label>
                <input id="brand" type="text" class="form-control" value="${movies?.trailer}">
              </div>


              <div>
                <label class="form-label">Precio por día</label>
                <input id="pricePerDay" type="number" class="form-control" value="${movies.pricePerDay}">
              </div>

              
            </div>`,
            showCancelButton: true,
            confirmButtonText: 'Guardar cambios',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const title = (document.getElementById('title') as HTMLInputElement).value;
                const director = (document.getElementById('director') as HTMLInputElement).value;
                const actors = (document.getElementById('actors') as HTMLInputElement).value;
                const year = parseInt((document.getElementById('year') as HTMLInputElement).value, 10);
                const thema = (document.getElementById('thema') as HTMLInputElement).value;
                const synopsis = (document.getElementById('synopsis') as HTMLInputElement).value;
                const image = (document.getElementById('image') as HTMLInputElement).value;
                const valoration = (document.getElementById('valoration') as HTMLInputElement).value;
                const ageRestriction = (document.getElementById('ageRestriction') as HTMLInputElement).value;
                const trailer = (document.getElementById('trailer') as HTMLInputElement).value;
                const pricePerDay = parseFloat((document.getElementById('pricePerDay') as HTMLInputElement).value);
                console.log('Datos de película actualizados:', { title, director, actors, year, thema, synopsis, image, valoration, ageRestriction, trailer, pricePerDay});
                return {title, director, synopsis, year, pricePerDay };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedMovie = result.value;
                console.log('Datos confirmados para actualizar', updatedMovie);
                this.movieService.updateMovie(movie, updatedMovie).subscribe({
                    next: () => {
                        Swal.fire({
                            title: '¡Película actualizada!',
                            text: 'La película ha sido actualizada correctamente',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        window.location.reload(); // Recargar la página
                        Object.assign(movie, updatedMovie);
                        console.log('Película después de la actualización:', movie);
                    },
                    
                    error: (error) => {
                        console.error('Error al actualizar:', error);
                        Swal.fire({
                            title: 'Oops!',
                            text: 'Ha ocurrido un error al actualizar la película',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        });
    } else {
        console.error('No se encontró la película a editar');
    }
}


  eliminar(movieId: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.movieService.deleteMovie(movieId).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Película eliminado!',
              text: 'La película ha sido eliminada correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
            this.movie = this.movie.filter(m => m._id !== movieId);
          },
          error: () => {
            Swal.fire({
              title: 'Oops!',
              text: 'Ha ocurrido un error al eliminar la película',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }

  addNewMovie() {
    Swal.fire({
      title: 'Agregar nuevo vehículo',
      html: `<div>
              <div>
                <label class="form-label">Titulo</label>
                <input id="brand" type="text" class="form-control">
              </div>

              <div>
                <label class="form-label">Director</label>
                <input id="brand" type="text" class="form-control">
              </div>

              <div>
                <label class="form-label">Actores</label>
                <input id="brand" type="text" class="form-control">
              </div>

              <div>
                <label class="form-label">Año</label>
                <input id="year" type="number" class="form-control">
              </div>

              <div>
                <label class="form-label">Género</label>
                <input id="brand" type="text" class="form-control">
              </div>
              
              <div>
                <label class="form-label">Sinopsis</label>
                <input id="description" type="text" class="form-control">
              </div>

              <div>
                <label class="form-label">Imagen</label>
                <input id="brand" type="text" class="form-control">
              </div>

              <div>
                <label class="form-label">Valoración</label>
                <input id="brand" type="text" class="form-control">
              </div>

              <div>
                <label class="form-label">Edad</label>
                <input id="brand" type="text" class="form-control">
              </div>

              <div>
                <label class="form-label">Trailer</label>
                <input id="brand" type="text" class="form-control">
              </div>


              <div>
                <label class="form-label">Precio por día</label>
                <input id="pricePerDay" type="number" class="form-control">
              </div>

              
            </div>`,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const director = (document.getElementById('director') as HTMLInputElement).value;
        const actors = (document.getElementById('actors') as HTMLInputElement).value;
        const year = parseInt((document.getElementById('year') as HTMLInputElement).value, 10);
        const thema = (document.getElementById('thema') as HTMLInputElement).value;
        const synopsis = (document.getElementById('synopsis') as HTMLInputElement).value;
        const image = (document.getElementById('image') as HTMLInputElement).value;
        const valoration = (document.getElementById('valoration') as HTMLInputElement).value;
        const ageRestriction = (document.getElementById('ageRestriction') as HTMLInputElement).value;
        const trailer = (document.getElementById('trailer') as HTMLInputElement).value;
        const pricePerDay = parseFloat((document.getElementById('pricePerDay') as HTMLInputElement).value);
        return {title, director, synopsis, year, pricePerDay };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newMovie = result.value;
        this.movieService.addMovie(newMovie).subscribe({
          next: (response:any) => {
            Swal.fire({
              title: '¡Película agregada!',
              text: 'La película ha sido agregada correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
            this.movie.push(response.movie as Movie);
            console.log(this.movie)
            window.location.reload(); // Recargar la página

          },
          error: (error) => {
            console.error('Error al agregar película', error);
            Swal.fire({
              title: 'Oops!',
              text: 'Ha ocurrido un error al agregar la película',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }
  

}