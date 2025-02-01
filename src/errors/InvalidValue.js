export default class InvalidValue extends Error {
    /**
     * @param {number} offset
     * @param {number} expected 
     * @param {number} actual 
     */
    constructor(field, expected, actual) {
        super(`Invalid Database format (${field} mismatch, expected ${expected}, got ${actual})`)
    }
}