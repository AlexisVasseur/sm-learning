import { CustomOperation } from './custom-number.types'

export type BigNumber = number[]

const fromString = (s: string): BigNumber => {
  return s.split('').map((char) => {
    const number = parseInt(char)
    if (isNaN(number)) throw new Error('Not a number')
    return number
  })
}

const add = (n1: BigNumber, n2: BigNumber): BigNumber => {
  // Because operations arithmetics are done from the least important digit
  n2 = n2.reverse()
  n1 = n1.reverse()

  // Ensure we are looping on the biggest array of bigNumber
  if (n2.length > n1.length) {
    const tmp = n2
    n2 = n1
    n1 = tmp
  }

  let carrying: number = 0
  const addition = n1.map((digit, index) => {
    let result = digit + carrying
    if (n2.length > index) {
      result += n2[index]
    }
    carrying = result > 9 ? 1 : 0
    return result % 10
  })

  // if the last operation
  if (carrying > 0) addition.push(carrying)

  // Reflip the result to get the good way
  return addition.reverse()
}

const multiply = (n1: BigNumber, n2: BigNumber): BigNumber => {
  // To iterate from the end
  n2 = n2.reverse()
  n1 = n1.reverse()

  return n1.reduce((acc: BigNumber, n1Digit, n1Index): BigNumber => {
    let carrying: number = 0
    const result: BigNumber = n2.map((n2Digit) => {
      const result = n1Digit * n2Digit + carrying
      carrying = Math.floor(result / 10)
      return result % 10
    })

    if (carrying > 0) {
      result.push(carrying)
    }

    // Push that much zero from current loop (at the beginning cause still reversed)
    for (let index = 0; index < n1Index; index++) {
      result.unshift(0)
    }
    return add(result.reverse(), acc)
  }, [])
}

const toString = (n: BigNumber): string => {
  return n.reduce((acc, number) => `${acc}${number.toString()}`, '')
}

export const BigNumberOperation: CustomOperation<BigNumber> = {
  fromString,
  add,
  multiply,
  toString
}
