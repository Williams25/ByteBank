import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Conta from './Conta'

describe('Componente Conta', () => {

  it('Exibir o saldo da conta com formatação monetaria', () => {
    render(<Conta saldo={1000} />)
    const saldo = screen.getByTestId('saldo-conta')
    
    expect(saldo.textContent).toBe('R$ 1000')
  })

  it('Chamar função de realizar transação quando o botão é clicado', () => {
    const functionRealizarTransacao = jest.fn()
    render(<Conta saldo={1000} realizarTransacao={functionRealizarTransacao} />)

    fireEvent.click(screen.getByText('Realizar operação'))

    expect(functionRealizarTransacao).toHaveBeenCalled()
  })
})