import Chunk from './Chunk.js';
import ChunkSizeMismatch from './errors/ChunkSizeMismatch.js';

export { IDENTIFIER, HEADER_SIZE } from './Chunk.js';
export const CHUNK_SIZE = 0x8;

export default class DataChunk extends Chunk {
    /**
     * @type {number}
     */
    chunkSize;

    /**
     * @param Uint8Array buffer 
     */
    constructor(buffer) {
        super(buffer)

        this.chunkSize = this.readUint32LE(buffer, CHUNK_SIZE)

        if (this.chunkSize !== buffer.length) {
            throw new ChunkSizeMismatch(buffer.length, this.chunkSize)
        }
    }
}