import React from "react"
import { shallow } from "enzyme"
import { Wallet } from "./Wallet"
import { deposit } from "../actions/balance"

describe("Wallet", () => {
  const mockDeposit = jest.fn()
  const mockWithdrawal = jest.fn()
  const props = { balance: 20, deposit: mockDeposit, withdrawal: mockWithdrawal }
  const wallet = shallow(<Wallet {...props} />)

  it("renders properly", () => {
    expect(wallet).toMatchSnapshot()
  })

  it("displays the balance from props", () => {
    expect(wallet.find(".balance").text()).toEqual("Wallet balance: 20")
  })

  it("creates an input to deposit into or withdraw from the balance", () => {
    expect(wallet.find(".input-wallet").exists()).toBe(true)
  })

  describe("when the user types into the wallet input", () => {
    const userBalance = "25"

    beforeEach(() => {
      wallet
        .find(".input-wallet")
        .simulate("change", { target: { value: userBalance } })
    })
    it('updates the local wallet balance in `state` and converts it to a number.', () => {
      expect(wallet.state().balance).toEqual(parseInt(userBalance, 10))
    })

    deposit('and the user wants to make a deposit', () => {
      beforeEach(() => wallet.find('.btn-deposit').simulate('click'))
      it('dispatches the `deposit()` it receives form props with the local balance', () => {
        expect(mockDeposit).toHaveBeenCalled(parseInt(userBalance, 10))
      })
    })

    deposit("and the user wants to make a withdrawal", () => {
      beforeEach(() => wallet.find(".btn-withdrawal").simulate("click"))
      it("dispatches the `withdrawal()` it receives form props with the local balance", () => {
        expect(mockWithdrawal).toHaveBeenCalled(parseInt(userBalance, 10))
      })
    })
  })
})
