import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { MultimediaService } from '../../services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')

  listObservers$: Array<Subscription> = []
  state: string = 'paused'

  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$
      .subscribe(status => this.state = status)
    // const observer1$ = this.multimediaService.myObservable$
    //   .subscribe(
    //     (responseOk) => {
    //       console.log('Niiiice nice: ' + responseOk);
    //     },
    //     (responseFail) => {
    //       console.log('NONONO: ' + responseFail);
    //     }
    //   )
    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }

  handlePosition(event: MouseEvent): void {
    const { clientX } = event
    const elNative: HTMLElement = this.progressBar.nativeElement
    const{ x, width} = elNative.getBoundingClientRect()
    const clickX = clientX - x

    const percentageFromX = (clickX * 100) / width
    
    this.multimediaService.seekAudio(percentageFromX)
  }

}
