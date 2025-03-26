import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit {

  @Input() tracks: TrackModel[] = []
  optionsSort: { property: string | null, order: string } = { property: null, order: 'asc'}

  constructor() { }

  ngOnInit(): void {

  }

  changeSort(property: string): void {
    const { order } = this.optionsSort
    this.optionsSort = {
      property: property,
      order: order === 'asc' ? 'desc' : 'asc'
    }
  }

}
