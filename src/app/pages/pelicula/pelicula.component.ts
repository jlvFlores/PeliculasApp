import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService ) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params.id;

    this.peliculasService.getPeliculaDetalle( id ).subscribe( movie => {

    });
  }

}
