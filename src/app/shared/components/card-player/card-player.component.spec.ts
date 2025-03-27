import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlayerComponent } from './card-player.component';

describe('CardPlayerComponent', () => {
  let component: CardPlayerComponent;
  let fixture: ComponentFixture<CardPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPlayerComponent);
    component = fixture.componentInstance;
    
    // Simula la entrada de datos con un objeto de prueba
    component.track = {
      _id: 1,
      cover: 'https://example.com/cover.jpg',
      name: 'Fake Song',
      album: 'Fake Album',
      url: 'https://example.com/audio.mp3'
    };
  
    fixture.detectChanges(); // Forzar actualización del componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
