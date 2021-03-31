import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App, { calcularNovoSaldo } from './App'
// BROWSER=none 
describe('Component App', () => {
  describe('Quando o app é renderizado', () => {
    it('Mostrar o nome do banco', async () => {
      render(<App />)
      expect(screen.getByText('ByteBank')).toBeInTheDocument()
    })

    it('Mostrar o saldo', async () => {
      render(<App />)
      expect(screen.getByText('Saldo:')).toBeInTheDocument()
    })

    it('O botão de realizar operação tem que ser exibido', () => {
      render(<App />)
      expect(screen.getByText('Realizar operação')).toBeInTheDocument()
    })
  })

  describe('Realizando transações', () => {
    it('Saque, o valor vai diminuir', () => {
      const valores = {
        transacao: 'saque',
        valor: 50
      }
      const novoSaldo = calcularNovoSaldo(valores, 150)
      expect(novoSaldo).toBe(100)
    })

    it('Deposito, o valor vai aumentar', () => {
      const valores = {
        transacao: 'deposito',
        valor: 50
      }
      const novoSaldo = calcularNovoSaldo(valores, 150)
      expect(novoSaldo).toBe(200)
    })

    it('Saque, a transação deve ser realizada', () => {
      render(<App />)

      const saldo = screen.getByText('R$ 1000')
      const transacao = screen.getByLabelText('Saque')
      const valor = screen.getByTestId('valor')
      const botao = screen.getByText('Realizar operação')

      expect(saldo.textContent).toBe('R$ 1000')

      fireEvent.click(transacao, { target: { value: 'saque' } }) // value do input
      fireEvent.change(valor, { target: { value: 10 } }) // input value
      fireEvent.click(botao)

      expect(saldo.textContent).toBe('R$ 990')
    })
  })
})