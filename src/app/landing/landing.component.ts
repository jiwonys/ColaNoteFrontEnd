import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.createFallingSquares();
  }

  createFallingSquares() {
    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'falling-squares-container');

    for (let i = 0; i < 20; i++) {
      const square = this.renderer.createElement('div');
      this.renderer.addClass(square, 'falling-square');
      this.renderer.setStyle(square, 'left', `${Math.random() * 100}vw`);
      this.renderer.setStyle(square, 'animation-duration', `${Math.random() * 2 + 1}s`);

      const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      this.renderer.setStyle(square, 'background-color', randomColor);
      this.renderer.appendChild(container, square);
    }

    this.renderer.appendChild(this.el.nativeElement, container);
  }
}
