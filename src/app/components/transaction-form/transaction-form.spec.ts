import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { TransactionForm } from './transaction-form';

describe('TransactionForm', () => {
  let component: TransactionForm;
  let fixture: ComponentFixture<TransactionForm>;
  let addTransaction: ReturnType<typeof vi.fn>;
  let navigate: ReturnType<typeof vi.fn>;

  function createComponent(type = 'income'): void {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: { snapshot: { paramMap: { get: () => type } } },
    });
    fixture = TestBed.createComponent(TransactionForm);
    component = fixture.componentInstance;
  }

  beforeEach(async () => {
    addTransaction = vi.fn();
    navigate = vi.fn();

    await TestBed.configureTestingModule({
      imports: [TransactionForm],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'income' } } } },
        { provide: Router, useValue: { navigate } },
        { provide: TransactionService, useValue: { addTransaction } },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    createComponent();

    expect(component).toBeTruthy();
  });

  it('should configure an expense form from the route', () => {
    createComponent('expense');

    expect(component.type()).toBe('expense');
    expect(component.title()).toBe('Adicionar Despesa');
    expect(component.subtitle()).toBe('Remova saldo da sua carteira');
    expect(component.isIncome()).toBe(false);
  });

  it('should format amount input as Brazilian currency', () => {
    createComponent();

    component.updateAmount({ target: { value: 'R$ 1234,56' } } as unknown as Event);

    expect(component.amount()).toBe('1.234,56');
  });

  it('should select a category and update a field', () => {
    createComponent();

    component.update(component.description, { target: { value: '  Salario  ' } } as unknown as Event);
    component.selectCategory('Casa');

    expect(component.description()).toBe('  Salario  ');
    expect(component.category()).toBe('Casa');
  });

  it('should not save an incomplete form', () => {
    createComponent();

    component.save(new SubmitEvent('submit'));

    expect(component.submitted()).toBe(true);
    expect(component.descriptionError()).toBe('Informe uma descricao.');
    expect(component.amountError()).toBe('Informe um valor maior que zero.');
    expect(component.categoryError()).toBe('Escolha uma categoria.');
    expect(addTransaction).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should save an income and navigate to the dashboard', () => {
    createComponent();
    component.description.set('  Salario  ');
    component.amount.set('1.234,56');
    component.selectCategory('Casa');

    component.save(new SubmitEvent('submit'));

    expect(addTransaction).toHaveBeenCalledWith({
      title: 'Salario',
      category: 'Casa',
      amount: 'R$ 1.234,56',
      type: 'income',
      date: component.date(),
    });
    expect(navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should save an expense with a negative amount', () => {
    createComponent('expense');
    component.description.set('Aluguel');
    component.amount.set('800,00');
    component.selectCategory('Casa');

    component.save(new SubmitEvent('submit'));

    expect(addTransaction).toHaveBeenCalledWith({
      title: 'Aluguel',
      category: 'Casa',
      amount: '- R$ 800,00',
      type: 'expense',
      date: component.date(),
    });
  });

  it('should reset the form', () => {
    createComponent();
    component.description.set('Teste');
    component.amount.set('10,00');
    component.selectCategory('Lazer');
    component.submitted.set(true);

    component.reset();

    expect(component.description()).toBe('');
    expect(component.amount()).toBe('');
    expect(component.category()).toBe('');
    expect(component.submitted()).toBe(false);
  });
});