import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {
    
  }

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }

  getTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        map((dataRaw: any) => {
          return dataRaw.data
        }),
        catchError((err) => {
          alert(`Error en la petición: error ${err.status}`)
          return of([])
        })
      )
  }

  getTracksReverse$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        mergeMap((dataRaw: any) => this.skipById(dataRaw.data.reverse(), 2)
        )
      )
  }
}
