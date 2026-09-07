import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Transaction, TransactionService } from '../../services/transaction.service';

@Component({
  imports: [RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly transactionService = inject(TransactionService);

  readonly currentDate = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  }).format(new Date());

  readonly transactions: Transaction[] = this.transactionService.getTransactions();
}
