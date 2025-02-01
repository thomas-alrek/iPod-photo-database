import DataChunk from './DataChunk.js';

export const NUM_CHILDREN = 0x0C;

export default class ImageName extends DataChunk {
    static get chunkIdentifier() {
        return 'mhni'
    }

    constructor(buffer) {
        super(buffer)
    }
}