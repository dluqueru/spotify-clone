import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @Input() customImg: string = '';

  @HostListener('error') errorHandler(): void {
    const nativeEl = this.host.nativeElement;
    nativeEl.src = this.customImg || '../../../assets/images/Spotify_logo_without_text.svg';
  }

  constructor(private host: ElementRef) { }

}
