export default class HeaderIdentifierMismatch extends Error {
    constructor(expected, actual) {
        super(`Invalid Database format (header identifier mismatch, expected ${expected}, got ${actual})`)
    }
}