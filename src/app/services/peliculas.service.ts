import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';
import { MovieDetails } from '../interfaces/movie-response';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: 'eb6dd47dbd32a3f446bf22764f1e749d',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    };
  }

  resetCartekeraPage(): void  {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {

    if ( this.cargando ) {
      return of([]);
    }

    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas( texto: string ): Observable<Movie[]> {

    const params = {...this.params, page: '1', query: texto};

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results )
    );
  }

  getPeliculaDetalle( id: string ) {
    return this.http.get<MovieDetails>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    );
  }

  getCast( id: string ): Observable<Cast[]> {

    return this.http.get<CreditsResponse>(`${ this.baseUrl }/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast),
      catchError( err => of([]) )
    );
  }
}
