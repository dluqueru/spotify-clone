import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @Input() customImg: string | boolean = false;

  @HostListener('error') errorHandler(): void {
    const nativeEl = this.host.nativeElement;
    nativeEl.src = this.customImg || '../../../assets/images/Spotify_logo_without_text.svg';

    if(this.customImg) {
      nativeEl.src = this.customImg
    } else {
      nativeEl.src = `data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg==`
    }
  }


  constructor(private host: ElementRef) { }

}
