import DataChunk from './DataChunk.js';

export default class ImageList extends DataChunk {
    static get chunkIdentifier() {
        return 'mhli'
    }

    constructor(buffer) {
        super(buffer)
    }
}