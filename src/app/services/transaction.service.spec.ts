import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the dashboard transactions', () => {
    const transactions = service.getTransactions();

    expect(transactions).toHaveLength(6);
    expect(transactions[0]).toEqual({
      title: 'Salario mensal',
      category: 'Receita',
      amount: 'R$ 6.500,00',
      type: 'income',
      date: '2025-05-20',
    });
  });

  it('should include income and expense transactions', () => {
    const types = service.getTransactions().map((transaction) => transaction.type);

    expect(types).toContain('income');
    expect(types).toContain('expense');
  });
});