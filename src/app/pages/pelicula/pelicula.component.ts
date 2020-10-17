import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PeliculasService } from 'src/app/services/peliculas.service';
import { MovieDetails } from 'src/app/interfaces/movie-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieDetails;

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location ) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;

    this.peliculasService.getPeliculaDetalle( id ).subscribe( movie => {
      this.pelicula = movie;
    });
  }

  onRegresar(): void {
    this.location.back();
  }

}
