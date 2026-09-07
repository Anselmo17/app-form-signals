import { Component } from '@angular/core';
import { computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  readonly email = signal('');
  readonly password = signal('');
  readonly emailTouched = signal(false);
  readonly passwordTouched = signal(false);
  readonly submitted = signal(false);

  readonly emailError = computed(() => {
    if ((!this.emailTouched() && !this.submitted()) || !this.email().trim()) {
      return this.submitted() ? 'Informe seu email.' : '';
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim()) ? '' : 'Digite um email válido.';
  });

  readonly passwordError = computed(() => {
    if (!this.passwordTouched() && !this.submitted()) {
      return '';
    }

    return this.password().trim() ? '' : 'Informe sua senha.';
  });

  constructor(private readonly router: Router) {}

  updateEmail(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
    this.emailTouched.set(true);
  }

  updatePassword(event: Event): void {
    this.password.set((event.target as HTMLInputElement).value);
    this.passwordTouched.set(true);
  }

  login(event: SubmitEvent): void {
    event.preventDefault();
    this.submitted.set(true);

    if (this.emailError() || this.passwordError()) {
      return;
    }

    void this.router.navigate(['/dashboard']);
  }
}
