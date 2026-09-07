import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

type TransactionType = 'income' | 'expense';

@Component({
  imports: [RouterLink],
  selector: 'app-transaction-form',
  styleUrl: './transaction-form.scss',
  templateUrl: './transaction-form.html',
})
export class TransactionForm {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly transactionService = inject(TransactionService);

  readonly type = signal<TransactionType>(this.route.snapshot.paramMap.get('type') === 'expense' ? 'expense' : 'income');
  readonly description = signal('');
  readonly amount = signal('');
  readonly category = signal('');
  readonly date = signal(new Date().toISOString().slice(0, 10));
  readonly submitted = signal(false);

  readonly isIncome = computed(() => this.type() === 'income');
  readonly title = computed(() => this.isIncome() ? 'Adicionar Receita' : 'Adicionar Despesa');
  readonly subtitle = computed(() => this.isIncome() ? 'Adicione saldo a sua carteira' : 'Remova saldo da sua carteira');
  readonly amountError = computed(() => this.submitted() && (!this.amount().trim() || this.parseAmount() <= 0) ? 'Informe um valor maior que zero.' : '');
  readonly descriptionError = computed(() => this.submitted() && !this.description().trim() ? 'Informe uma descricao.' : '');
  readonly categoryError = computed(() => this.submitted() && !this.category() ? 'Escolha uma categoria.' : '');

  readonly categories = ['Casa', 'Alimentacao', 'Transporte', 'Lazer', 'Saude', 'Outros'];

  update(signalValue: { set: (value: string) => void }, event: Event): void {
    signalValue.set((event.target as HTMLInputElement).value);
  }

  updateAmount(event: Event): void {
    const digits = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    const formattedAmount = digits ? (Number(digits) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '';
    this.amount.set(formattedAmount);
  }

  private parseAmount(): number {
    return Number(this.amount().replace(/\./g, '').replace(',', '.'));
  }

  selectCategory(category: string): void {
    this.category.set(category);
  }

  save(event: SubmitEvent): void {
    event.preventDefault();
    this.submitted.set(true);

    if (this.descriptionError() || this.amountError() || this.categoryError()) {
      return;
    }

    const formattedAmount = `R$ ${this.amount()}`;
    this.transactionService.addTransaction({
      title: this.description().trim(),
      category: this.category(),
      amount: this.isIncome() ? formattedAmount : `- ${formattedAmount}`,
      type: this.type(),
      date: this.date(),
    });
    void this.router.navigate(['/dashboard']);
  }

  reset(): void {
    this.description.set('');
    this.amount.set('');
    this.category.set('');
    this.date.set(new Date().toISOString().slice(0, 10));
    this.submitted.set(false);
  }
}