import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { TrackService } from '../../services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel> = [ ];
  tracksReverse: Array<TrackModel> = [ ];

  listObservers$: Array<Subscription> = [ ];

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    this.trackService.getTracks$()
      .subscribe(response => {
        this.tracksTrending = response
      })

    this.trackService.getTracksReverse$()
    .subscribe(response => {
      this.tracksReverse = response
    })
    
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }

}
