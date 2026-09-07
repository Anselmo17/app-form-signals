import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  public isConfirmStep = false;
  public emailForConfirmation = 'teste@gmail.com';

  public onRegisterSubmit(): void {
    this.isConfirmStep = true;
  }

  public onBack(): void {
    this.isConfirmStep = false;
  }
}
