import { BigNumberOperation } from './big-numbers'

describe('custom int test', () => {
  describe('from string test', () => {
    it('should return number if 0', () => {
      // Act
      const n = BigNumberOperation.fromString('0')

      // Assert
      expect(BigNumberOperation.toString(n)).toEqual('0')
    })

    it('should throw error if not a number', () => {
      // Act
      try {
        const n = BigNumberOperation.fromString('toto')
      } catch (e) {
        // Assert
        expect(e).toEqual(new Error('Not a number'))
      }
    })
  })

  describe('add test', () => {
    // Arrange
    const useCases = [
      { n1: '0', n2: '0', expected: '0' },
      { n1: '10', n2: '100', expected: '110' },
      { n1: '1000', n2: '10000', expected: '11000' },
      { n1: '99', n2: '22', expected: '121' },
      {
        n1: '9007199254740991',
        n2: '90071992547409',
        expected: '9097271247288400'
      },
      {
        n1: '900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        n2: '1',
        expected:
          '900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001'
      }
    ]

    useCases.forEach((useCase, index) => {
      it(`should match use case ${index}`, () => {
        // Act
        const n1 = BigNumberOperation.fromString(useCase.n1)
        const n2 = BigNumberOperation.fromString(useCase.n2)
        const res = BigNumberOperation.add(n1, n2)

        // Assert
        expect(BigNumberOperation.toString(res)).toEqual(useCase.expected)
      })
    })
  })

  describe('multiply test', () => {
    // Arrange
    const useCases = [
      { n1: '0', n2: '0', expected: '0' },
      { n1: '10', n2: '100', expected: '1000' },
      { n1: '1000', n2: '1', expected: '1000' },
      { n1: '99', n2: '11', expected: '1089' },
      {
        n1: '9007199254740991',
        n2: '90071992547409',
        expected: '811296384146058440262583142319'
      },
      {
        n1: '900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        n2: '1',
        expected:
          '900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
      }
    ]

    useCases.forEach((useCase, index) => {
      it(`should match use case ${index}`, () => {
        // Act
        const n1 = BigNumberOperation.fromString(useCase.n1)
        const n2 = BigNumberOperation.fromString(useCase.n2)
        const res = BigNumberOperation.multiply(n1, n2)

        // Assert
        expect(BigNumberOperation.toString(res)).toEqual(useCase.expected)
      })
    })
  })
})
