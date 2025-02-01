import Chunk from './Chunk.js';
import { IDENTIFIER, CHUNK_SIZE } from './DataChunk.js';

import PhotoAlbum from './PhotoAlbum.js';

export const NUM_CHILDREN = 0x08

export default class AlbumList extends Chunk {
    children = [];

    static get chunkIdentifier() {
        return 'mhla'
    }

    constructor(buffer) {
        super(buffer)

        this.numChildren = this.readUint32LE(buffer, NUM_CHILDREN)
        let chunkBaseAddress = this.headerSize

        for (let i = 0; i < this.numChildren; i++) {
            const chunkSize = this.readUint32LE(buffer, chunkBaseAddress + CHUNK_SIZE)
            const chunk = buffer.slice(chunkBaseAddress, chunkBaseAddress + chunkSize)
            const chunkType = this.readString(chunk, IDENTIFIER, 4)

            switch (chunkType) {
                case PhotoAlbum.chunkIdentifier:
                    this.children.push(new PhotoAlbum(chunk))
                    break
                default:
                    this.children.push(new Chunk(chunk))
                    break
            }

            chunkBaseAddress += chunkSize
        }
    }
}