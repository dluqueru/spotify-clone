import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as mockRaw from '../../../data/user.json';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser: any = (mockRaw as any).default;
  let httpClientSpy: { post: jasmine.Spy };
  let cookieSpy: { set: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CookieService]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    cookieSpy = jasmine.createSpyObj('CookieService', ['set']);

    service = new AuthService(httpClientSpy as any, cookieSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an object containing "data" & "tokenSession"', (done: DoneFn) => {
    const user: any = mockUser.userOk;
    const mockResponse = {
      data: {},
      tokenSession: '0x0x0x'
    };

    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.sendCredentials(user.email, user.password).subscribe(responseApi => {
      const getProperties = Object.keys(responseApi);
      expect(getProperties).toContain('data');
      expect(getProperties).toContain('tokenSession');

      done();
    });
  });
});