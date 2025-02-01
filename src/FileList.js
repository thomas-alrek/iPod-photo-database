import Chunk from './Chunk.js';

export default class FileList extends Chunk {
    static get chunkIdentifier() {
        return 'mhlf'
    }

    constructor(buffer) {
        super(buffer)
    }
}