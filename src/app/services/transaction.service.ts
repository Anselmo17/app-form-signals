import { Injectable } from '@angular/core';

export interface Transaction {
  title: string;
  category: string;
  amount: string;
  type: 'income' | 'expense';
  date: string;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly transactions: Transaction[] = [
    { title: 'Salario mensal', category: 'Receita', amount: 'R$ 6.500,00', type: 'income', date: '2025-05-20' },
    { title: 'Aluguel', category: 'Moradia', amount: '- R$ 1.800,00', type: 'expense', date: '2025-05-19' },
    { title: 'Supermercado', category: 'Alimentacao', amount: '- R$ 486,72', type: 'expense', date: '2025-05-18' },
    { title: 'Freelance de design', category: 'Receita', amount: 'R$ 1.200,00', type: 'income', date: '2025-05-16' },
    { title: 'Academia', category: 'Saude', amount: '- R$ 119,90', type: 'expense', date: '2025-05-15' },
    { title: 'Restaurante', category: 'Lazer', amount: '- R$ 86,40', type: 'expense', date: '2025-05-14' },
  ];

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.unshift(transaction);
  }
}