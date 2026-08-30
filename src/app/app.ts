import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './components/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {}

