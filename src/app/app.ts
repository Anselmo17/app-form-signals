import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos os validadores integrados da API de Signals
import { form, FormField, required, minLength } from '@angular/forms/signals';

interface RegisterForm {
  fullName: string;
  password:  string;
  bank: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormField],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {


  readonly model = signal<RegisterForm>({ fullName: '', password: '', bank: 'itau' });

  // Tema (true = dark, false = light)
  readonly isDark = signal(true);

  // O segundo argumento define as regras de validação do formulário
  readonly registerForm = form(this.model, (field) => {
    // Validações para o campo Nome Completo
    required(field.fullName, { message: 'O nome completo é obrigatório.' });

    // Validações para o campo Senha
    required(field.password, { message: 'A senha é obrigatória.' });
    minLength(field.password, 6, { message: 'A senha deve conter no mínimo 6 caracteres.' });
    // Validação para o campo Banco (opcional, se quiser tornar obrigatório remova comentário)
    // required(field.bank, { message: 'O banco é obrigatório.' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    
    // O Signal Forms impede o envio se houver erros na árvore de controles
    if (this.registerForm().invalid()) {
      alert('Por favor, corrija os erros do formulário antes de enviar.');
      return;
    }
    const data = this.model();
    console.log('Dados do formulário:', data);
    console.log('Dados sem senha:', { fullName: data.fullName, bank: data.bank });
    console.log('Senha (mascarada):', data.password ? '*'.repeat(data.password.length) : '(vazia)');
  }

  toggleTheme() {
    this.isDark.update(v => !v);
  }
}
