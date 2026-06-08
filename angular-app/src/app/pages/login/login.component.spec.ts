import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when email is empty', () => {
    component.email = '';
    component.password = '';
    component.submit();
    expect(component.emailError).toBe('Email is required');
  });

  it('should show error when password is empty', () => {
    component.email = 'admin@test.com';
    component.password = '';
    component.submit();
    expect(component.passwordError).toBe('Password is required');
  });

  it('should show error for invalid email format', () => {
    component.email = 'notanemail';
    component.password = 'password123';
    component.submit();
    expect(component.emailError).toBe('Invalid email format');
  });

  it('should show error for wrong credentials', () => {
    component.email = 'wrong@test.com';
    component.password = 'wrongpassword';
    component.submit();
    expect(component.loginError).toBe('Invalid email or password');
  });

  it('should show success and redirect on valid credentials', (done) => {
    component.email = 'admin@test.com';
    component.password = 'password123';
    component.submit();
    expect(component.loginSuccess).toContain('Login successful');
    setTimeout(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/products']);
      done();
    }, 1100);
  });

  it('should clear errors on each submit', () => {
    component.email = 'wrong@test.com';
    component.password = 'wrong';
    component.submit();
    expect(component.loginError).toBeTruthy();

    component.email = 'admin@test.com';
    component.password = 'password123';
    component.submit();
    expect(component.loginError).toBe('');
  });
});
