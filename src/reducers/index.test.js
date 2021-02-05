import rootReducer from './index'

describe('rootReducer', () => {
  it('initializes the defualt state', () => {
    expect(rootReducer({}, {})).toEqual({balance: 0, bitcoin: {}})
  })
})