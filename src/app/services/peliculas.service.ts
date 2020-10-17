import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CarteleraResponse } from '../interfaces/cartelera-response';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: 'eb6dd47dbd32a3f446bf22764f1e749d',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    };
  }

  getCartelera(): Observable<CarteleraResponse> {

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      tap( () => {
        this.carteleraPage += 1;
      })
    );

  }

}
