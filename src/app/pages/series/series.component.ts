import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service'; 
import { Series } from '../../interfaces/series'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterSeriesPipe } from '../../pipes/filter-series.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DivisaPipe } from '../../pipes/divisa.pipe';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-series',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink ,FilterSeriesPipe, DivisaPipe],
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  series: Series[] = [];
  filtro: string = '';
  seriesHtml: string = ''; 

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.seriesService.getAll().subscribe({
      next: (data: Series[]) => {
        this.series = data;
        this.generateSeriesHtml();
      },
      error: (err) => {
        console.error('Error series', err);
      }
    });
  }

  generateSeriesHtml(): void {
    this.seriesHtml = '';

   
  }
}