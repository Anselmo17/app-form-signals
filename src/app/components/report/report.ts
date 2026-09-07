import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Transaction, TransactionService } from '../../services/transaction.service';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-report',
  styleUrl: './report.scss',
  templateUrl: './report.html',
})
export class Report {
  private readonly transactionService = inject(TransactionService);

  readonly transactions: Transaction[] = this.transactionService.getTransactions();
}
