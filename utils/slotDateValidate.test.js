const isValidTime = require('./slotDateValidate2')
console.log(isValidTime)

describe('testing isValidTime function', () => {
    it('should return true', () => {
        const start_date = new Date('2024-05-30T04:56:16.373Z')
        const end_date = new Date('2024-05-30T05:56:16.373Z')
        expect(isValidTime(start_date, end_date)).toBeTruthy()
    })

    it('should return false. start date should be greater current time', () => {
        const start_date = new Date('2024-05-30T02:56:16.373Z')
        const end_date = new Date('2024-05-30T03:10:16.373Z')
        expect(isValidTime(start_date, end_date)).toBeFalsy()
    })

})
