import { Component } from '@angular/core';
import { PeliculasService } from './services/peliculas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private peliculasService: PeliculasService ) {

    this.peliculasService.getCartelera()
      .subscribe( resp => {
        console.log(resp);

      });

  }

}
