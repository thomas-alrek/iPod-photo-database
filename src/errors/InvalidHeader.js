export default class InvalidHeader extends Error {
    constructor(address, length) {
        super(`Invalid chunk size (header too short, attempted to read ${length} bytes at address ${address})`)
    }
}