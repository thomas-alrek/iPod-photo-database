export default class InvalidUnknown2 extends Error {
    /**
     * @param {number[]} expected 
     * @param {number} actual 
     */
    constructor(expected, actual) {
        super(`Invalid Database format (unknown2 mismatch, expected [${expected.join(', ')}], got ${actual})`)
    }
}