import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement

  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  // myObservable$: Subject<any> = new Subject()
  myObservable$: BehaviorSubject<any> = new BehaviorSubject('SSSSSSS')

  constructor() {
    this.audio = new  Audio()

    this.trackInfo$.subscribe(responseOk => {
      if(responseOk) {
        console.log('REPRODUCIEN2: ', responseOk.url);
        this.setAudio(responseOk)
      }
    })

    this.listenAllEvents()

    // setTimeout(() => {
    //   this.myObservable$.next('SSSSSSSSS')
    // }, 1000)

    // setTimeout(() => {
    //   this.myObservable$.error('XXXXXXXXX')
    // }, 3500)

    // this.myObservable$ = new Observable(
    //   (observer: Observer<any>) => {
    //     observer.next('awawa')

    //     setTimeout(() => {
    //       observer.complete()
    //     }, 1000)

    //     setTimeout(() => {
    //       observer.next('awawa')
    //     }, 2500)

    //     setTimeout(() => {
    //       observer.error('ouch')
    //     }, 2500)
    //   }
    // )
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)
  }

  private setPlayerStatus = (state: any) => {
    switch(state.type) {
      case 'play':
        this.playerStatus$.next('paused')
        break;
      case 'playing':
        this.playerStatus$.next('playing')
        break;
      case 'ended':
        this.playerStatus$.next('ended')
        break;
      default:
        this.playerStatus$.next('paused')
        break;
    }
  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio
    this.setTimeElapsed(currentTime)
    this.setTimeRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

  private setPercentage(currentTime: number, duration: number) {
    let percentage = (currentTime * 100) / duration
    this.playerPercentage$.next(percentage)
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor(currentTime / 60) % 60
  
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes
    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  private setTimeRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor(timeLeft / 60) % 60
  
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }


  public setAudio(track: TrackModel): void {
    console.log(this.audio);
    console.log(track.url);
    this.audio.src = track.url
    this.audio.play()
  }

  public togglePlayer(): void {
    this.audio.paused ? this.audio.play() : this.audio.pause()
  }

  public seekAudio(percentage: number): void {
    const { duration } = this.audio
    const percentageToSecond = (percentage * duration) / 100

    this.audio.currentTime = percentageToSecond
  }
}
