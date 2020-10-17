import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';

import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];

  public mySwiper: Swiper;

  constructor() { }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  ngOnInit(): void {

  }
  onSlideNext(): void {
    this.mySwiper.slideNext();
  }
  onSlidePrev(): void {
    this.mySwiper.slidePrev();
  }

}
