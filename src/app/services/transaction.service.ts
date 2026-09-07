import { Injectable } from '@angular/core';

export interface Transaction {
  title: string;
  category: string;
  amount: string;
  type: 'income' | 'expense';
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly transactions: Transaction[] = [
    { title: 'Salario mensal', category: 'Receita', amount: 'R$ 6.500,00', type: 'income' },
    { title: 'Aluguel', category: 'Moradia', amount: '- R$ 1.800,00', type: 'expense' },
    { title: 'Supermercado', category: 'Alimentacao', amount: '- R$ 486,72', type: 'expense' },
    { title: 'Freelance de design', category: 'Receita', amount: 'R$ 1.200,00', type: 'income' },
    { title: 'Academia', category: 'Saude', amount: '- R$ 119,90', type: 'expense' },
    { title: 'Restaurante', category: 'Lazer', amount: '- R$ 86,40', type: 'expense' },
  ];

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.unshift(transaction);
  }
}