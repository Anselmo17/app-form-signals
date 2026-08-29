import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { vi } from 'vitest';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should log form data with masked password on submit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;

    // set valid model values
    comp.model.set({ fullName: 'Ana', password: 'secret12', bank: 'itau' });

    vi.spyOn(console, 'log');

    // trigger submit
    comp.onSubmit(new Event('submit'));

    expect(console.log).toHaveBeenCalledWith('Dados do formulário:', comp.model());
    expect(console.log).toHaveBeenCalledWith('Dados sem senha:', { fullName: 'Ana', bank: 'itau' });
    expect(console.log).toHaveBeenCalledWith('Senha (mascarada):', '*'.repeat('secret12'.length));
  });
});
