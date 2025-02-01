import DataChunk, { HEADER_SIZE, CHUNK_SIZE } from './DataChunk.js';

import ImageList from './ImageList.js';
import AlbumList from './AlbumList.js';
import FileList from './FileList.js';

export const INDEX = 0xC;
export const IMAGE_LIST = 0x1;
export const ALBUM_LIST = 0x2;
export const FILE_LIST = 0x3;

export default class DataSet extends DataChunk {
    index;
    children = [];

    static get chunkIdentifier() {
        return 'mhsd'
    }

    /**
     * @param Uint8Array buffer 
     */
    constructor(buffer) {
        super(buffer)

        this.index = this.readUint32LE(buffer, INDEX)

        const chunkBaseAddress = this.headerSize
        const chunkSize = this.readUint32LE(buffer, chunkBaseAddress + CHUNK_SIZE)

        switch (this.index) {
            case IMAGE_LIST:
                this.children.push(new ImageList(buffer.slice(chunkBaseAddress, chunkBaseAddress + chunkSize)))
                break
            case ALBUM_LIST:
                this.children.push(new AlbumList(buffer.slice(chunkBaseAddress)))
                break
            case FILE_LIST:
                this.children.push(new FileList(buffer.slice(chunkBaseAddress)))
                break
            default:
                this.children.push(new Chunk(buffer.slice(chunkBaseAddress, chunkBaseAddress + chunkSize)))
                break
        }
    }
}