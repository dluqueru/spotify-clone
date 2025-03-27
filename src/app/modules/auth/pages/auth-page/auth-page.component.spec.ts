import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPageComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return invalid', () => {
    // ARRANGE
    const mockCredentials = {
      email: '0000',
      password: '1'
    }

    const emailForm = component.formLogin.get('email')
    const passwordForm = component.formLogin.get('password')

    // ACT
    emailForm?.setValue(mockCredentials.email)
    passwordForm?.setValue(mockCredentials.password)

    // ASSERT
    expect(component.formLogin.invalid).toBeTruthy()
  });

  it('button should say "Iniciar sesión"', () => {
    const elementRef = fixture.debugElement.query(By.css('.form-action button'))
    const getInnerText = elementRef.nativeElement.innerText

    expect(getInnerText).toEqual("Iniciar sesión")
  });
});
