
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';
import { FormsModule } from '@angular/forms';
import { FilterMoviesPipe } from '../../pipes/filter-movies.pipe';
import { CommonModule } from '@angular/common';
import { DivisaPipe } from '../../pipes/divisa.pipe';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [FormsModule, FilterMoviesPipe , CommonModule, RouterModule, DivisaPipe] ,
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
 
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  filtro: string = '';
  moviesHtml: string = ''; 

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getAll().subscribe({
      next: (data: Movie[]) => {
        this.movies = data;
        this.generateMoviesHtml();
      },
      error: (err) => {
        console.error('Error movies', err);
      }
    });
  }

  generateMoviesHtml(): void {
    this.moviesHtml = '';

    
  }
}  