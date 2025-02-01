export default class ChunkSizeMismatchMismatch extends Error {
    constructor(expected, actual) {
        super(`Invalid Chunk Size Header (expected ${expected}, got ${actual})`)
    }
}